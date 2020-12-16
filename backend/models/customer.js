const mongoose = require("mongoose");
const ClientBase = require("./client");

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

var shoppingList = {
  id: { type: String },
  title: { type: String },
  wishedProducts: [],
};

var shoppingCart = {
  productsIn: { type: String },
  productAmount: { type: Number },
};

var creditCard = {
  creditCardNumber: { type: String },
  creditCardCvc: { type: String },
  creditCardData: { type: String },
  creditCardName: { type: String },
};

var customerSchema = new Schema(
  {
    shoppingLists: [shoppingList],
    orderIds: [],
    cart: { type: shoppingCart },
    addresses: [address],
    phoneNumber: { type: String },
    birthday: { type: String },
    creditCards: [creditCard],
  },
  { collection: "Clients" }
);

ClientBase.discriminator("Customer", customerSchema);

module.exports = mongoose.model("Customer");
