const mongoose = require("mongoose");
const ClientBase = require("./client");

const Schema = mongoose.Schema;

var shoppingList = {
    id: { type: String },
    title: { type: String },
    wishedProducts: { type: String }, // This will be product object later on
}

var customerSchema = new Schema(
  {
    shoppingLists: [shoppingList],
    orders: { type: String },
    cart: { type: String },
    addresses: { type: String },
    phoneNumber: { type: String },
    birthday: { type: String },
    creditCards: { type: String },
  },
  { collection: "Clients" }
);

ClientBase.discriminator("Customer", customerSchema);

module.exports = mongoose.model("Customer");
