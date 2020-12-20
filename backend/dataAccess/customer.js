const mongoose = require("mongoose");

const Customer = mongoose.model("Customer");

exports.populateCustomerDB = function (obj, path = "customer") {
  return Customer.populate(obj, {
    path,
    model: "Customer",
  });
};

exports.getCustomerByIdDB = function (_id) {
  return Customer.findById(_id).lean();
};

exports.createCustomerDB = function (customer) {
  return Customer.create(customer);
};

exports.getCustomerByEmailDB = function (email) {
  return Customer.findOne({
    email,
  }).lean();
};

exports.updateCustomerPasswordDB = function (_id, password) {
  return Customer.findByIdAndUpdate(
    _id,
    {
      $set: {
        password,
      },
    },
    { _id: 1, new: true }
  );
};

exports.updateCustomerCartDB = function (_id, shoppingCart) {
  console.log("dataAccess");
  console.log(_id);
  console.log(shoppingCart);
  return Customer.findByIdAndUpdate(
    _id,
    {
      $set: {
        shoppingCart,
      },
    },
    { _id: 1 }
  );
};

exports.updateCustomerVerifyEmailTokenDB = function (_id, verifyEmailToken) {
  return Customer.findByIdAndUpdate(
    _id,
    {
      $set: {
        verifyEmailToken,
      },
    },
    { _id: 1, new: true }
  );
};

exports.updateCustomerResetPasswordTokenDB = function (_id, resetPasswordToken) {
  return Customer.findByIdAndUpdate(
    _id,
    {
      $set: {
        resetPasswordToken,
      },
    },
    { _id: 1, new: true }
  );
};

exports.getCustomerByVerifyEmailTokenDB = function (verifyEmailToken) {
  return Customer.findOne({
    verifyEmailToken,
  }).lean();
};

exports.getCustomerByResetPasswordTokenDB = function (resetPasswordToken) {
  return Customer.findOne({
    resetPasswordToken,
  }).lean();
};

exports.updateCustomerDB = function (_id, fields) {
  return Customer.findByIdAndUpdate(
    _id,
    {
      $set: fields,
    },
    { _id: 1, new: true, runValidators: true }
  );
};
