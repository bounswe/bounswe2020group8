const mongoose = require("mongoose");

const Vendor = mongoose.model("Vendor");

exports.populateVendorDB = function (obj, path = "vendor") {
  return Vendor.populate(obj, {
    path,
    model: "Vendor",
  });
};

exports.getVendorByIdDB = function (_id) {
  return Vendor.findById(_id).lean();
};

exports.createVendorDB = function (vendor) {
  return Vendor.create(vendor);
};

exports.getVendorByEmailDB = function (email) {
  return Vendor.findOne({
    email,
  }).lean();
};

exports.updateVendorPasswordDB = function (_id, password) {
  return Vendor.findByIdAndUpdate(
    _id,
    {
      $set: {
        password,
      },
    },
    { _id: 1 }
  );
};

exports.updateVendorVerifyEmailTokenDB = function (_id, verifyEmailToken) {
  return Vendor.findByIdAndUpdate(
    _id,
    {
      $set: {
        verifyEmailToken,
      },
    },
    { _id: 1 }
  );
};

exports.updateVendorResetPasswordTokenDB = function (_id, resetPasswordToken) {
  return Vendor.findByIdAndUpdate(
    _id,
    {
      $set: {
        resetPasswordToken,
      },
    },
    { _id: 1 }
  );
};

exports.getVendorByVerifyEmailTokenDB = function (verifyEmailToken) {
  return Vendor.findOne({
    verifyEmailToken,
  }).lean();
};

exports.getVendorByResetPasswordTokenDB = function (resetPasswordToken) {
  return Vendor.findOne({
    resetPasswordToken,
  }).lean();
};

exports.updateVendorDB = function (_id, fields) {
  return Vendor.findByIdAndUpdate(
    _id,
    {
      $set: fields,
    },
    { _id: 1, new: true, runValidators: true }
  );
};
