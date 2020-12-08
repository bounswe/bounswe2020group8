const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var adminSchema = new Schema({
  email: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("Admin", adminSchema);
