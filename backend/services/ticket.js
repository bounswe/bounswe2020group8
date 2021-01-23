const BaseUtil = require("../util/baseUtil");
const TicketDataAccess = require("../dataAccess/ticket");

exports.getAllTicketService = async function () {
  let tickets = TicketDataAccess.getAllTicketDB();
  return { result: tickets.length, data: tickets };
};

exports.createOneTicketService = async function (client, topic, message) {
  let message = {
    payload: message,
  };
  const ticket = {
    client_id: client._id,
    topic,
    conversation: [message],
  };
  let newTicket = TicketDataAccess.createTicketDB(ticket);
  return { data: newTicket };
};

exports.getOneTicketService = async function (_id) {
  let ticket = TicketDataAccess.getTicketByIdDB(_id);
  return { data: ticket };
};

exports.replyATicketService = async function (_id, new_message) {
  let ticket = TicketDataAccess.replyATicketDB(_id, new_message);
  return { data: ticket };
};

exports.forwardATicketService = async function (_id, admin_id) {
  let ticket = TicketDataAccess.forwardOneTicketByAdminDB(_id, admin_id);
  return { data: ticket };
};

exports.closeOneTicketService = async function (_id) {
  let ticket = TicketDataAccess.closeOneTicketByAdminDB(_id);
  return { data: ticket };
};

exports.getAllActiveTicketService = async function () {
  let tickets = TicketDataAccess.getAllActiveTicketDB();
  return { result: tickets.length, data: tickets };
};

exports.getAllActiveUnassignedTicketService = async function () {
  let tickets = TicketDataAccess.getAllActiveUnassignedTicketDB();
  return { result: tickets.length, data: tickets };
};

exports.getAllTicketofAdminService = async function (admin_id) {
  let tickets = TicketDataAccess.getAllTicketofAdminDB(admin_id);
  return { result: tickets.length, data: tickets };
};

exports.getAllActiveTicketofAdminService = async function (admin_id) {
  let tickets = TicketDataAccess.getAllActiveTicketofAdminDB(admin_id);
  return { result: tickets.length, data: tickets };
};

exports.getAllTicketofClientService = async function (client_id) {
  let tickets = TicketDataAccess.getAllTicketofClientDB(client_id);
  return { result: tickets.length, data: tickets };
};

exports.getAllActiveTicketofClientService = async function (client_id) {
  let tickets = TicketDataAccess.getAllActiveTicketofClientDB(client_id);
  return { result: tickets.length, data: tickets };
};

exports.getAllTicketofClientAndAdminService = async function (client_id, admin_id) {
  let tickets = TicketDataAccess.getAllTicketofClientAndAdminDB(client_id, admin_id);
  return { result: tickets.length, data: tickets };
};

exports.getAllActiveTicketofClientAndAdminService = async function (client_id, admin_id) {
  let tickets = TicketDataAccess.getAllActiveTicketofClientAndAdminDB(client_id, admin_id);
  return { result: tickets.length, data: tickets };
};
