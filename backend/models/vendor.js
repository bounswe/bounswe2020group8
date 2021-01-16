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
  longitude: { type: Number },
  latitude: { type: Number },
};

var vendorSchema = new Schema(
  {
    companyName: { type: String },
    companyDomainName: { type: String },
    aboutCompany: { type: String, default: null },
    IBAN: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    address: address,
    locations: [location],
  },
  { collection: "Clients" }
);

ClientBase.discriminator("Vendor", vendorSchema);

module.exports = mongoose.model("Vendor");
