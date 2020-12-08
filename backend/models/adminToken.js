const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminTokenSchema = new Schema({
  tokenCode: { type: String },
  client: { type: Schema.Types.ObjectId, ref: "Admin" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdminToken", adminTokenSchema);
