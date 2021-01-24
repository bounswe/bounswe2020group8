const mongoose = require("mongoose");
const Constants = require("../util/constants");

const Schema = mongoose.Schema;

var notification = {
  type: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  hyperlink: { type: String },
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
    notifications: [notification],
  },
  {
    discriminatorKey: "__type",
    collection: "Clients",
  }
);

module.exports = mongoose.model("Client", clientSchema);
