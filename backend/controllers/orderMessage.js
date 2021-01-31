const BaseUtil = require("../util/baseUtil");
const BB = require("bluebird");
const OrderMessageService = require("../services/orderMessage");

exports.getAnOrderMessageOfASuborderController = BaseUtil.createController((req) => {
  let { order_id, suborder_id } = req.body;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => OrderMessageService.getAnOrderMessageOfASuborderService(order_id, suborder_id));
});

exports.getAllOrderMessagesController = BaseUtil.createController((req) => {
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => OrderMessageService.getAllOrderMessagesService(req.client));
});

exports.startAnOrderMessageOfASuborderController = BaseUtil.createController((req) => {
  let orderMessage = req.body;
  orderMessage.client_id = req.client._id;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => OrderMessageService.startAnOrderMessageOfASuborderService(orderMessage));
});

exports.replyAnOrderMessageOfASuborderController = BaseUtil.createController((req) => {
  let _id = req.params.oid;
  let payload = req.body.payload;

  let status = req.client.__type;
  let isSentByVendor = false;
  if (status === "Vendor") {
    isSentByVendor = true;
  }

  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      OrderMessageService.replyAnOrderMessageOfASuborderService(_id, payload, isSentByVendor)
    );
});

exports.closeAnOrderMessageOfASuborderController = BaseUtil.createController((req) => {
  let _id = req.params.oid;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => OrderMessageService.closeAnOrderMessageOfASuborderService(_id));
});
