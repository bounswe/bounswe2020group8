const mongoose = require("mongoose");
const ClientBase = require("./client");

const Schema = mongoose.Schema;

var customerSchema = new Schema(
  {
    companyName: { String },
    aboutCompany: { String },
    IBAN: { String },
    addresses: { String },
    location: { String },
  },
  { collection: "Clients" }
);

ClientBase.discriminator("Vendor", customerSchema);

module.exports = mongoose.model("Vendor");
