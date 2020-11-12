const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  email: { type: String },
  password: { type: String },
  isBanned: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastActiveAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", clientSchema);
