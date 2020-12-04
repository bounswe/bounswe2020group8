const mongoose = require("mongoose");
const ClientBase = require("./client");

const Schema = mongoose.Schema;

var customerSchema = new Schema(
  {
    shoppingLists: { type: String },
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
