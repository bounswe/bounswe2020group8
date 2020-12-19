const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var productRequestSchema = new Schema(
  {
    type: { type: String },
    status: { type: String },
    vendorID: { type: Schema.Types.ObjectId },
    oldValue: { type: Schema.Types.ObjectId },
    newValue: { type: Map },
    messageFromAdmin: { type: String },
  },
  {
    collection: "ProductRequests",
  }
);

module.exports = mongoose.model("ProductRequest", productRequestSchema);
