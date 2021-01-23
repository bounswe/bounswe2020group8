const BaseUtil = require("../util/baseUtil");
const BB = require("bluebird");
const TicketService = require("../services/ticket");

exports.getAllTicketController = BaseUtil.createController((req) => {
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => TicketService.getAllTicketService());
});

exports.createOneTicketController = BaseUtil.createController((req) => {
  let client = req.client;
  let { topic, message } = req.body;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => TicketService.createOneTicketService(client, topic, message));
});

exports.getOneTicketController = BaseUtil.createController((req) => {
  let _id = req.params.tid;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => TicketService.getOneTicketService(_id));
});

exports.replyATicketController = BaseUtil.createController((req) => {
  let _id = req.params.tid;
  let payload = req.body.payload;

  let status = req.client.__type;
  let isSentByAdmin = false;
  if (status === "Admin") {
    isSentByAdmin = true;
  }

  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => TicketService.replyATicketService(_id, payload, isSentByAdmin));
});

exports.forwardATicketController = BaseUtil.createController((req) => {
  let _id = req.params.tid;
  let admin_id = req.body.admin_id;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => TicketService.forwardATicketService(_id, admin_id));
});

exports.closeOneTicketController = BaseUtil.createController((req) => {
  let _id = req.params.tid;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => TicketService.closeOneTicketService(_id));
});

exports.getAllActiveUnassignedTicketController = BaseUtil.createController((req) => {
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => TicketService.getAllActiveUnassignedTicketService());
});

exports.getAllActiveTicketController = BaseUtil.createController((req) => {
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => TicketService.getAllActiveTicketService());
});

exports.getAllTicketofAdminController = BaseUtil.createController((req) => {
  let admin_id = req.params.aid;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => TicketService.getAllTicketofAdminService(admin_id));
});

exports.getAllActiveTicketofAdminController = BaseUtil.createController((req) => {
  let admin_id = req.params.aid;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => TicketService.getAllActiveTicketofAdminService(admin_id));
});

exports.getAllTicketofClientController = BaseUtil.createController((req) => {
  let client_id = req.params.cid;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => TicketService.getAllTicketofClientService(client_id));
});

exports.getAllActiveTicketofClientController = BaseUtil.createController((req) => {
  let client_id = req.params.cid;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => TicketService.getAllActiveTicketofClientService(client_id));
});

exports.getAllTicketofClientAndAdminController = BaseUtil.createController((req) => {
  let admin_id = req.params.aid;
  let client_id = req.params.cid;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => TicketService.getAllTicketofClientAndAdminService(admin_id, client_id));
});

exports.getAllActiveTicketofClientAndAdminController = BaseUtil.createController((req) => {
  let admin_id = req.params.aid;
  let client_id = req.params.cid;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => TicketService.getAllActiveTicketofClientAndAdminService(admin_id, client_id));
});
