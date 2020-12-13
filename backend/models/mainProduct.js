const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const parameter = {
  name: { type: String },
  values: [{ type: String }],
};

var mainProductSchema = new Schema(
  {
    title: { type: String },
    parameters: [{ type: parameter }],
    description: { type: String },
    rating: { type: Number },
    numberOfRating: { type: Number },
    brand: { type: String },
    soldAmount: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    category: { type: String },
    isConfirmed: { type: Boolean },
    tags: [{ type: String }],
  },
  {
    collection: "MainProducts",
  }
);

module.exports = mongoose.model("MainProduct", mainProductSchema);
