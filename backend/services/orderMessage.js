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

exports.replyAnOrderMessageOfASuborderService = async function (_id, payload, _isSentByVendor) {
  let message = {
    isSentByVendor: _isSentByVendor,
    payload,
  };
  let orderMessage = await OrderMessageDataAccess.replyAConversation(_id, message);
  let client = await ClientDataAccess.getClientByIdDB(orderMessage.client_id);
  if (_isSentByVendor === false) {
    let hyperlink = `http://${Config.frontendAddr}:${Config.frontendPort}/account/messages`;
    let notification = await NotificationWare.createNotification(
      "ORDER_MESSAGE_REPLIED_BY_CUSTOMER",
      hyperlink
    );
    await NotificationWare.registerNotification(client._id, notification);
  } else {
    let hyperlink = `http://${Config.frontendAddr}:${Config.frontendPort}/vendor/account/messages`;
    let notification = await NotificationWare.createNotification(
      "ORDER_MESSAGE_REPLIED_BY_VENDOR",
      hyperlink
    );
    await NotificationWare.registerNotification(client._id, notification);
  }

  return { data: ticket };
};

exports.closeAnOrderMessageOfASuborderService = async function (_id) {
  let result = await OrderMessageDataAccess.closeAConversation(_id);
  return { data: result };
};
