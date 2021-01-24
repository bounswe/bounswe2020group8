const OrderMessageDataAccess = require("../dataAccess/orderMessage");

exports.getAnOrderMessageOfASuborderService = async function (order_id, suborder_id) {
  let result = await OrderMessageDataAccess.getOrderMessage(order_id, suborder_id);
  return { data: result };
};

exports.getAllOrderMessagesService = async function (_id) {
  let results = await OrderMessageDataAccess.getAllOrderMessages(_id);
  return { result: results.length, data: results };
};

exports.startAnOrderMessageOfASuborderService = async function (orderMessage) {
  const message = {
    payload: orderMessage.payload,
  };
  delete orderMessage.payload;
  orderMessage.conversation = [message];
  let result = await OrderMessageDataAccess.startAConversation(orderMessage);
  return { data: result };
};

exports.replyAnOrderMessageOfASuborderService = async function (_id, payload, isSentByVendor) {
  let message = {
    isSentByAdmin: _isSentByAdmin,
    payload,
  };
  let ticket = await OrderMessageDataAccess.replyAConversation(_id, message);
  return { data: ticket };
};

exports.closeAnOrderMessageOfASuborderService = async function (_id) {
  let result = await OrderMessageDataAccess.closeAConversation(_id);
  return { data: result };
};
