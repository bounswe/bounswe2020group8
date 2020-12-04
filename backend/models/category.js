const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: { type: String },
});

module.exports = mongoose.model("Category", categorySchema);
