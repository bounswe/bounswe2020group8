const mongoose = require("mongoose");
const ClientBase = require("./client");

const Schema = mongoose.Schema;

var address = {
  addressName: {type: String},
  name: {type: String},
  addressLine: {type: String},
  city: {type: String},
  state: {type: String},
  zipCode: {type: String},
  phone: {type: String},
}

var location = {
  location: {type: String},
}

var photo = {
  id: {type: String},
  path: {type: String},
}

var comment = {
  body: {type: String},
  rating: {type: Number},
  ownerId: {type: String},
  date: {type: Date},
  id: {type: String},
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

var vendorSchema = new Schema(
  {
    companyName: { type: String },
    companyDomainName: { type: String },
    aboutCompany: { type: String },
    products: [product],
    IBAN: {type: String },
    address: {type: address },
    location: {type: String },
  },
  { collection: "Clients" }
);

ClientBase.discriminator("Vendor", vendorSchema);

module.exports = mongoose.model("Vendor");
