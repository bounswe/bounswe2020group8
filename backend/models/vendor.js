const mongoose = require("mongoose");
const ClientBase = require("./client");

const Schema = mongoose.Schema;

var address = {
  addressName: { type: String },
  name: { type: String },
  addressLine: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  phone: { type: String },
};

var location = {
  longitude: { type: String },
  latitude: { type: String },
};

var vendorSchema = new Schema(
  {
    companyName: { type: String },
    companyDomainName: { type: String },
    aboutCompany: { type: String },
    IBAN: { type: String },
    address: { type: address },
    location: { type: location },
  },
  { collection: "Clients" }
);

ClientBase.discriminator("Vendor", vendorSchema);

module.exports = mongoose.model("Vendor");
