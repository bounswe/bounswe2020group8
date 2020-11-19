const mongoose = require("mongoose");
const Constants = require("../util/constants");

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  email: { type: String },
  password: { type: String },
  isBanned: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  type: { type: String, enum: Object.values(Constants.ENUMS.CLIENT_TYPE) }
});

module.exports = mongoose.model("Client", clientSchema);
