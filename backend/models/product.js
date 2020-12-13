const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vendor = {
  vendorID: { type: String },
  price: { type: Number },
  amountLeft: { type: Number },
  shipmentPrice: { type: Number },
  cargoCompany: { type: String },
  isConfirmed: { type: Boolean },
};

var productSchema = new Schema(
  {
    parameters: { type: String },
    vendors: [{ type: vendor }],
    default: { type: vendor },
    photos: { type: Boolean },
    parentProducts: { type: Object },
  },
  {
    collection: "Products",
  }
);

module.exports = mongoose.model("Product", productSchema);
