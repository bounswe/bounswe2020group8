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

exports.addToCustomerShoppingCartDB = function (_id, productId, vendorId, amount) {
  return Customer.findOneAndUpdate(
    {
      _id: _id,
      shoppingCart: { $not: { $elemMatch: { productId: productId, vendorId: vendorId } } },
    },
    {
      $addToSet: {
        shoppingCart: { productId: productId, vendorId: vendorId, amount: 0 },
      },
    },
    { new: true }
  );
};

exports.updateCustomerShoppingCartDB = function (_id, productId, vendorId, amount) {
  return Customer.findOneAndUpdate(
    { _id: _id, shoppingCart: { $elemMatch: { productId: productId, vendorId: vendorId } } },
    {
      $set: {
        "shoppingCart.$.amount": amount,
      },
    },
    { new: true }
  );
};

exports.deleteFromCustomerShoppingCartDB = function (_id, productId, vendorId) {
  return Customer.findOneAndUpdate(
    { _id: _id },
    {
      $pull: {
        shoppingCart: { productId: productId, vendorId: vendorId },
      },
    },
    { new: true }
  );
};

exports.resetCustomerShoppingCartDB = function (_id) {
  return Customer.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        shoppingCart: [],
      },
    },
    { new: true }
  );
};

exports.getCustomerShoppingCartDB = function (_id) {
  return Customer.findById({ _id: _id }).select("shoppingCart");
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
