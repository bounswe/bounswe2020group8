const mongoose = require("mongoose");
const ClientBase = require("./client");

const Schema = mongoose.Schema;

var shoppingList = {
    id: { type: String },
    title: { type: String },
    wishedProducts: { type: String }, // This will be product object later on
}

var order = {
  customerID: {type: String},
  product:  {type: String},
  id: {type: String},
  email: {type: String},
  shippingAddress: {type: adress},
  billingAddress: {type: adress},
  creditCard: {type: String},
  shippingInfo: {type: String},
  refundProcess: {type: String},
}

var cart = {
  userID: {type: String},
  productsIn: {type: String},
  productAmount: {type: Integer},
}

var address = {
  addressName: {type: String},
  name: {type: String},
  addressLine: {type: String},
  city: {type: String},
  state: {type: String},
  zipCode: {type: String},
  phone: {type: String},
}

var creditCard = {
  creditCardNumber = {type: String},
  creditCardCvc = {type: String},
  creditCardData = {type: String},
  creditCardName = {type: String}
}

var customerSchema = new Schema(
  {
    shoppingLists: [shoppingList],
    orders: [order],
    cart: { type: cart },
    addresses: [adress],
    phoneNumber: { type: String },
    birthday: { type: String },
    creditCards: [creditCard],
  },
  { collection: "Clients" }
);

ClientBase.discriminator("Customer", customerSchema);

module.exports = mongoose.model("Customer");
