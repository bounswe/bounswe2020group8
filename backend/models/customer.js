const mongoose = require("mongoose");
const ClientBase = require("./client");

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

var shoppingList = {
  title: { type: String },
  wishedProducts: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      vendorId: { type: Schema.Types.ObjectId, ref: "Vendor" },
    },
  ],
};

var shoppingCart = {
  productsIn: [({ type: Schema.Types.ObjectId }, { type: Number })], // productId and productAmount
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
    shoppingCart: [],
    addresses: [address],
    phoneNumber: { type: String },
    birthday: { type: String },
    creditCards: [creditCard],
  },
  { collection: "Clients" }
);

ClientBase.discriminator("Customer", customerSchema);

module.exports = mongoose.model("Customer");
