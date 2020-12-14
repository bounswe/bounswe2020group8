const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var photo = {
  id: { type: String },
};

var comment = {
  body: { type: String },
  rating: { type: Number },
  date: { type: Date },
  id: { type: String },
};

var product = {
  id: { type: String },
  vendors: {},
  title: { type: String },
  description: { type: String },
  amountLeft: { type: Number },
  price: { type: Number },
  rating: { type: Number },
  numberOfRatings: { type: Number },
  comments: [comment],
  photos: [photo],
  brand: { type: String },
  shipmentPrice: { type: Number },
  soldAmount: { type: Number },
  releaseDate: { type: String },
  cargoCompany: { type: String },
  category: { type: String },
  isConfirmed: { type: Boolean },
};

var adminSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
    waitingProducts: [product],
  },
  {
    collection: "Admins",
  }
);

module.exports = mongoose.model("Admin", adminSchema);
