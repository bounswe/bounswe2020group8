const mongoose = require("mongoose");
const ClientBase = require("./client");

const Schema = mongoose.Schema;


var comment = {
  body: {type: String},
  rating: {type: Number},
  ownerId: {type: String},
  date: {type: Date},
  id: {type: String},
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

var photo = {
  id: {type: String},
  path: {type: String},
}

var product = {
  id: {type: String},
  vendors: {},
  title: {type: String},
  description: {type: String},
  amountLeft: {type: Number},
  price: {type: Number},
  rating: {type: Number},
  numberOfRatings: {type: Number},
  comments: [comment],
  photos: [photo],
  brand: {type: String},
  shipmentPrice: {type: Number},
  soldAmount: {type: Number},
  releaseDate: {type: String},
  cargoCompany: {type: String},
  category: {type: String},
  isConfirmed: {type: Boolean},
}

var shoppingList = {
    id: {type: String },
    title: {type: String },
    wishedProducts: [product],
  }


var bulkProduct = {
  productId: {type: String},
  productAmount: {type: Number},
}

var order = {
  customerID: {type: String},
  product:  {type: bulkProduct},
  bulkProductId: {type: String},
  id: {type: String},
  email: {type: String},
  shippingAddress: {type: address},
  billingAddress: {type: address},
  creditCard: {type: String},
  shippingInfo: {type: String},
  refundProcess: {type: String},
}

var cart = {
  userID: {type: String},
  productsIn: {type: String},
  productAmount: {type: Number},
}


var creditCard = {
  creditCardNumber: {type: String},
  creditCardCvc: {type: String},
  creditCardData: {type: String},
  creditCardName: {type: String}
}

var customerSchema = new Schema(
  {
    shoppingLists: [shoppingList],
    orders: [order],
    cart: {type: cart },
    addresses: [address],
    phoneNumber: {type: String },
    birthday: {type: String },
    creditCards: [creditCard],
  },
  { collection: "Clients" }
);

ClientBase.discriminator("Customer", customerSchema);

module.exports = mongoose.model("Customer");
