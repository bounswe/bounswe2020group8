const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var message = {
  sendAt: { type: Date, default: Date.now },
  isSentByAdmin: { type: Boolean, default: false },
  payload: { type: String },
};

var ticketSchema = new Schema(
  {
    client_id: { type: mongoose.Schema.ObjectId, ref: "Client" },
    admin_id: { type: mongoose.Schema.ObjectId, ref: "Admin", default: null },
    startedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    topic: { type: String },
    conversation: [message],
    isActive: { type: Boolean, default: true },
    isAssigned: { type: Boolean, default: false },
  },
  {
    collection: "Tickets",
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
