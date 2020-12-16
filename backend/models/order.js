const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var address = {
  id: { type: String },
  addressName: { type: String },
  name: { type: String },
  addressLine: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  phone: { type: String },
};

var orderSchema = new Schema(
  {
    orderID: { type: String },
    customerID: { type: String },
    product: { type: String },
    email: { type: String },
    shippingAddress: { type: address },
    billingAddress: { type: address },
    creditCard: { type: String },
    shippingInfo: { type: String },
    refundProcess: { type: String },
  },
  { collection: "Orders" }
);

module.exports = mongoose.model("Order", orderSchema);
