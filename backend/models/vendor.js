const mongoose = require("mongoose");
const ClientBase = require("./client");

const Schema = mongoose.Schema;

var vendorSchema = new Schema(
  {
    companyName: { type: String },
    companyDomainName: { type: String },
    aboutCompany: { type: String },
    IBAN: { type: String },
    address: { type: String },
    location: { type: String },
  },
  { collection: "Clients" }
);

ClientBase.discriminator("Vendor", vendorSchema);

module.exports = mongoose.model("Vendor");
