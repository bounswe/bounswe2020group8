const mongoose = require("mongoose");
const Ticket = mongoose.model("Ticket");

exports.getTicketByIdDB = function (_id) {
  return Ticket.findById(_id).lean();
};

exports.createTicketDB = function (ticket) {
  return Ticket.create(ticket);
};

exports.getAllTicketDB = function () {
  return Ticket.find().lean();
};

exports.getAllActiveTicketDB = function () {
  return Ticket.find({ isActive: true }).lean();
};

exports.getAllActiveUnassignedTicketDB = function () {
  return Ticket.find({ isActive: true, isAssigned: false }).lean();
};

exports.getAllTicketofAdminDB = function (admin_id) {
  return Ticket.find({ admin_id }).lean();
};

exports.getAllActiveTicketofAdminDB = function (admin_id) {
  return Ticket.find({ admin_id, isActive: true }).lean();
};

exports.getAllTicketofClientDB = function (client_id) {
  return Ticket.find({ client_id }).lean();
};

exports.getAllActiveTicketofClientDB = function (client_id) {
  return Ticket.find({ client_id, isActive: true }).lean();
};

exports.getAllTicketofClientAndAdminDB = function (client_id, admin_id) {
  return Ticket.find({ client_id, admin_id }).lean();
};

exports.getAllActiveTicketofClientAndAdminDB = function (client_id, admin_id) {
  return Ticket.find({ client_id, admin_id, isActive: true }).lean();
};

exports.replyATicketDB = function (_id, new_message) {
  return Ticket.findByIdAndUpdate(
    _id,
    {
      $set: {
        updatedAt: Date.now(),
      },
      $push: {
        conversation: new_message,
      },
    },
    { _id: 1, new: true, runValidators: true }
  ).lean();
};

exports.forwardOneTicketByAdminDB = function (_id, new_admin_id) {
  return Ticket.findByIdAndUpdate(
    _id,
    {
      $set: {
        admin_id: new_admin_id,
        isAssigned: true,
        updatedAt: Date.now(),
      },
    },
    { _id: 1, new: true, runValidators: true }
  ).lean();
};

exports.closeOneTicketByAdminDB = function (_id) {
  return Ticket.findByIdAndUpdate(_id, {
    $set: {
      updatedAt: Date.now(),
      isActive: false,
    },
  }).lean();
};
