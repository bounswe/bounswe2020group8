const mongoose = require("mongoose");
const OrderMessage = mongoose.model("OrderMessage");

exports.getOrderMessage = async function (order_id, suborder_id) {
  return OrderMessage.find({ order_id, suborder_id }).lean();
};

exports.getAllOrderMessages = async function (_id) {
  return OrderMessage.find({ client_id: _id }).lean();
};

exports.startAConversation = async function (orderMessage) {
  return OrderMessage.create(orderMessage);
};

exports.replyAConversation = async function (_id, new_message) {
  return OrderMessage.findByIdAndUpdate(
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

exports.closeAConversation = async function (_id) {
  return OrderMessage.findByIdAndUpdate(_id, {
    $set: {
      updatedAt: Date.now(),
      isActive: false,
    },
  }).lean();
};
