const OrderMessageDataAccess = require("../dataAccess/orderMessage");
const NotificationWare = require("../util/notification");

exports.getAnOrderMessageOfASuborderService = async function (order_id, suborder_id) {
  let result = await OrderMessageDataAccess.getOrderMessage(order_id, suborder_id);
  return { data: result };
};

exports.getAllOrderMessagesService = async function (client) {
  if (client.__type === "Customer") {
    let results = await OrderMessageDataAccess.getAllOrderMessagesCustomer(client._id);
    return { result: results.length, data: results };
  } else if (client.__type === "Vendor") {
    let results = await OrderMessageDataAccess.getAllOrderMessagesVendor(client._id);
    return { result: results.length, data: results };
  }
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
    let hyperlink = `/account/messages/${orderMessage.order_id}/${orderMessage.suborder_id}/${orderMessage.vendor_id}`;
    let notification = await NotificationWare.createNotification(
      "ORDER_MESSAGE_REPLIED_BY_CUSTOMER",
      hyperlink
    );
    await NotificationWare.registerNotification(orderMessage.vendor_id, notification);
  } else {
    let hyperlink = `/vendor/account/messages/${orderMessage.order_id}/${orderMessage.suborder_id}/${orderMessage.vendor_id}`;
    let notification = await NotificationWare.createNotification(
      "ORDER_MESSAGE_REPLIED_BY_VENDOR",
      hyperlink
    );
    await NotificationWare.registerNotification(client._id, notification);
  }

  return { data: orderMessage };
};

exports.closeAnOrderMessageOfASuborderService = async function (_id) {
  let result = await OrderMessageDataAccess.closeAConversation(_id);
  return { data: result };
};
