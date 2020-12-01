const mongoose = require("mongoose");
const ClientBase = require("./client");

const Schema = mongoose.Schema;

var customerSchema = new Schema(
  {
    shoppingLists: { String },
    orders: { String },
    cart: { String },
    addresses: { String },
    telephoneNumber: { String },
    birthday: { String },
    creditCards: { String },
  },
  { collection: "Clients" }
);

ClientBase.discriminator("Customer", customerSchema);

module.exports = mongoose.model("Customer");
