const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientTokenSchema = new Schema({
  tokenCode: { type: String },
  client: { type: Schema.Types.ObjectId, ref: "Client" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ClientToken", clientTokenSchema);
