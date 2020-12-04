const mongoose = require("mongoose");
const Constants = require("../util/constants");

const Schema = mongoose.Schema;

var clientSchema = new Schema(
  {
    email: { type: String },
    name: { type: String },
    lastName: { type: String },
    password: { type: String },
    isSuspended: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    googleID: { type: String, default: null },
    verifyEmailToken: { type: String },
    resetPasswordToken: { type: String },
    isVerified: { type: Boolean },
    currentConversations: [String],
  },
  {
    discriminatorKey: "__type",
    collection: "Clients",
  }
);

module.exports = mongoose.model("Client", clientSchema);
