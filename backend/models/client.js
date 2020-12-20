const mongoose = require("mongoose");
const Constants = require("../util/constants");

const Schema = mongoose.Schema;

var Message = {
  sender: { type: String },
  receiver: { type: String },
  message: { type: String },
  isRead: { type: Boolean },
  time: { type: Date },
};

var clientSchema = new Schema(
  {
    email: { type: String },
    name: { type: String },
    lastName: { type: String },
    password: { type: String },
    isSuspended: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    googleID: { type: String, default: null },
    verifyEmailToken: { type: String },
    resetPasswordToken: { type: String },
    isVerified: { type: Boolean },
    currentConversations: [Message],
  },
  {
    discriminatorKey: "__type",
    collection: "Clients",
  }
);

module.exports = mongoose.model("Client", clientSchema);
