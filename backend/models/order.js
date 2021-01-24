const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var address = {
  addressName: { type: String },
  name: { type: String },
  addressLine: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  phone: { type: String },
};

var creditCard = {
  creditCardNumber: { type: String },
  creditCardCvc: { type: String },
  creditCardData: { type: String },
  creditCardName: { type: String },
};

var subOrder = {
  productId: { type: Schema.Types.ObjectId },
  vendorId: { type: Schema.Types.ObjectId },
  amount: { type: Number },
  price: { type: Number },
  shipmentPrice: { type: Number },
  cargoCompany: { type: String },
  shippingAddress: { type: address },
  billingAddress: { type: address },
  creditCard: { type: creditCard },
  status: { type: String },
  arrivesIn: { type: Number },
};

var orderSchema = new Schema(
  {
    orderID: { type: Schema.Types.ObjectId },
    customerID: { type: Schema.Types.ObjectId },
    orders: [subOrder],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Orders" }
);

module.exports = mongoose.model("Order", orderSchema);
