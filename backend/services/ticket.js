const BaseUtil = require("../util/baseUtil");
const TicketDataAccess = require("../dataAccess/ticket");

exports.getAllTicketService = async function () {
  let tickets = await TicketDataAccess.getAllTicketDB();
  return { result: tickets.length, data: tickets };
};

exports.createOneTicketService = async function (client, topic, _message) {
  let message = {
    payload: _message,
  };
  const ticket = {
    client_id: client._id,
    topic,
    conversation: [message],
  };
  let newTicket = await TicketDataAccess.createTicketDB(ticket);
  return { data: newTicket };
};

exports.getOneTicketService = async function (_id) {
  let ticket = await TicketDataAccess.getTicketByIdDB(_id);
  return { data: ticket };
};

exports.replyATicketService = async function (_id, payload, _isSentByAdmin) {
  let message = {
    isSentByAdmin: _isSentByAdmin,
    payload,
  };
  console.log(message);
  let ticket = await TicketDataAccess.replyATicketDB(_id, message);
  return { data: ticket };
};

exports.forwardATicketService = async function (_id, admin_id) {
  let ticket = await TicketDataAccess.forwardOneTicketByAdminDB(_id, admin_id);
  return { data: ticket };
};

exports.closeOneTicketService = async function (_id) {
  let ticket = await TicketDataAccess.closeOneTicketByAdminDB(_id);
  return { data: ticket };
};

exports.getAllActiveTicketService = async function () {
  let tickets = await TicketDataAccess.getAllActiveTicketDB();
  return { result: tickets.length, data: tickets };
};

exports.getAllActiveUnassignedTicketService = async function () {
  let tickets = await TicketDataAccess.getAllActiveUnassignedTicketDB();
  return { result: tickets.length, data: tickets };
};

exports.getAllTicketofAdminService = async function (admin_id) {
  let tickets = await TicketDataAccess.getAllTicketofAdminDB(admin_id);
  return { result: tickets.length, data: tickets };
};

exports.getAllActiveTicketofAdminService = async function (admin_id) {
  let tickets = await TicketDataAccess.getAllActiveTicketofAdminDB(admin_id);
  return { result: tickets.length, data: tickets };
};

exports.getAllTicketofClientService = async function (client_id) {
  let tickets = await TicketDataAccess.getAllTicketofClientDB(client_id);
  return { result: tickets.length, data: tickets };
};

exports.getAllActiveTicketofClientService = async function (client_id) {
  let tickets = await TicketDataAccess.getAllActiveTicketofClientDB(client_id);
  return { result: tickets.length, data: tickets };
};

exports.getAllTicketofClientAndAdminService = async function (client_id, admin_id) {
  let tickets = await TicketDataAccess.getAllTicketofClientAndAdminDB(client_id, admin_id);
  return { result: tickets.length, data: tickets };
};

exports.getAllActiveTicketofClientAndAdminService = async function (client_id, admin_id) {
  let tickets = await TicketDataAccess.getAllActiveTicketofClientAndAdminDB(client_id, admin_id);
  return { result: tickets.length, data: tickets };
};
