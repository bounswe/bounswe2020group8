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

var product_info = {
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  vendorId: { type: Schema.Types.ObjectId, ref: "Vendor" },
};

var shoppingList = {
  title: { type: String },
  wishedProducts: [product_info],
};

var searchHistory = {
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
};

var shoppingCartItem = {
  productId: { type: Schema.Types.ObjectId },
  vendorId: { type: Schema.Types.ObjectId },
  amount: { type: Number },
  price: { type: Number },
  shipmentPrice: { type: Number },
  cargoCompany: { type: String },
  title: { type: String },
  vendorName: { type: String },
  photos: [String],
};

var creditCard = {
  creditCardNumber: { type: String },
  creditCardCvc: { type: String },
  creditCardData: { type: String },
  creditCardName: { type: String },
};

var customerSchema = new Schema(
  {
    watchList: [product_info],
    shoppingLists: [shoppingList],
    shoppingCart: [shoppingCartItem],
    addresses: [address],
    phoneNumber: { type: String },
    birthday: { type: String },
    creditCards: [creditCard],
    searchHistory: [searchHistory],
  },
  { collection: "Clients" }
);

ClientBase.discriminator("Customer", customerSchema);

module.exports = mongoose.model("Customer");
