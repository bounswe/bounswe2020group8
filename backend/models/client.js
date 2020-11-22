const mongoose = require("mongoose");
const Constants = require("../util/constants");

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  email: { type: String },
  name: { type: String },
  lastName: { type: String },
  password: { type: String },
  googleID: { type: String, default: null },
  isBanned: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  type: { type: String, enum: Object.values(Constants.ENUMS.CLIENT_TYPE) },
  verifyEmailToken: { type: String },
  resetPasswordToken: { type: String },
  isVerified: { type: Boolean },
});

module.exports = mongoose.model("Client", clientSchema);
