const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var watcherSchema = new Schema(
  {
    client_id: { type: mongoose.Schema.ObjectId, ref: "Client" },
    product_id: { type: mongoose.Schema.ObjectId, ref: "Product" },
    vendor_id: { type: mongoose.Schema.ObjectId, ref: "Vendor" },
  },
  {
    collection: "Watchers",
  }
);

module.exports = mongoose.model("Watcher", watcherSchema);
