const mongoose = require("mongoose");
const ClientBase = require("./client");

const Schema = mongoose.Schema;

var customerSchema = new Schema(
  {
    companyName: { type: String },
    companyDomainName: { type: String },
    aboutCompany: { type: String },
    IBAN: { type: String },
    addresses: { type: String },
    location: { type: String },
  },
  { collection: "Clients" }
);

ClientBase.discriminator("Vendor", customerSchema);

module.exports = mongoose.model("Vendor");
