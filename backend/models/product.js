const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vendorSpecific = {
  vendorID: { type: Schema.Types.ObjectId, ref: "Vendor" },
  price: { type: Number },
  amountLeft: { type: Number },
  shipmentPrice: { type: Number },
  cargoCompany: { type: String },
};

const parameter = {
  name: { type: String },
  value: { type: String },
};

var productSchema = new Schema(
  {
    tags: [{ type: String }],
    parameters: [parameter],
    vendorSpecifics: [vendorSpecific],
    default: vendorSpecific,
    photos: [{ type: String }],
    parentProduct: { type: Schema.Types.ObjectId, ref: "MainProduct" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    collection: "Products",
  }
);

module.exports = mongoose.model("Product", productSchema);
