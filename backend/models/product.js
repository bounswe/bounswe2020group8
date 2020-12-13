const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vendorSpecific = {
  vendorID: { type: String },
  price: { type: Number },
  amountLeft: { type: Number },
  shipmentPrice: { type: Number },
  cargoCompany: { type: String },
  isConfirmed: { type: Boolean },
};

const parameter = {
  name: { type: String },
  value: { type: String },
};

var productSchema = new Schema(
  {
    tags: [{ type: String }],
    parameters: [{ type: parameter }],
    vendorSpecifics: [{ type: vendorSpecific }],
    default: { type: vendorSpecific },
    photos: { type: Boolean },
    parentProduct: { type: Object },
  },
  {
    collection: "Products",
  }
);

module.exports = mongoose.model("Product", productSchema);
