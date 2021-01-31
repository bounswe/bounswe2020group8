const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var message = {
  sendAt: { type: Date, default: Date.now },
  isSentByVendor: { type: Boolean, default: false },
  payload: { type: String },
};

var orderMessageSchema = new Schema(
  {
    order_id: { type: mongoose.Schema.ObjectId, ref: "Order" },
    suborder_id: { type: mongoose.Schema.ObjectId },
    client_id: { type: mongoose.Schema.ObjectId, ref: "Client" },
    vendor_id: { type: mongoose.Schema.ObjectId, ref: "Vendor" },
    startedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    conversation: [message],
    isActive: { type: Boolean, default: true },
  },
  {
    collection: "OrderMessages",
  }
);

module.exports = mongoose.model("OrderMessage", orderMessageSchema);
