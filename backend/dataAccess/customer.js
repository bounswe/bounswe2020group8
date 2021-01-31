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

exports.getAddressByIdDB = function (_id, addressId) {
  return Customer.findOne(
    { _id: _id, addresses: { $elemMatch: { _id: addressId } } },
    { "addresses.$": 1 }
  );
};

exports.getCreditCardByIdDB = function (_id, creditCardId) {
  return Customer.findOne(
    { _id: _id, creditCards: { $elemMatch: { _id: creditCardId } } },
    { "creditCards.$": 1 }
  );
};

exports.addToCustomerShoppingCartDB = function (
  _id,
  productId,
  vendorId,
  amount,
  price,
  shipmentPrice,
  cargoCompany,
  title,
  vendorName,
  photos
) {
  return Customer.findOneAndUpdate(
    {
      _id: _id,
      shoppingCart: { $not: { $elemMatch: { productId: productId, vendorId: vendorId } } },
    },
    {
      $addToSet: {
        shoppingCart: {
          productId: productId,
          vendorId: vendorId,
          amount: 0,
          price: price,
          shipmentPrice: shipmentPrice,
          cargoCompany: cargoCompany,
          title: title,
          vendorName: vendorName,
          photos: photos,
        },
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

exports.updateShoppingListsDB = function (_id, newList) {
  return Customer.findByIdAndUpdate(
    _id,
    {
      $push: {
        shoppingLists: newList,
      },
    },
    { _id: 1, new: true, runValidators: true }
  );
};

exports.getOneShoppingListByIdDB = function (cid, lid) {
  let listId = mongoose.Types.ObjectId(lid);
  return Customer.aggregate([
    {
      $match: { _id: cid, "shoppingLists._id": listId },
    },
    {
      $set: {
        shoppingList: {
          $reduce: {
            input: "$shoppingLists",
            initialValue: {},
            in: {
              $cond: [{ $eq: ["$$this._id", listId] }, "$$this", "$$value"],
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        shoppingList: 1,
      },
    },
  ]);
};

exports.patchOneShoppingListByIdDB = function (lid, cid, newTitle, newShoppingList) {
  let listId = mongoose.Types.ObjectId(lid);
  return Customer.updateOne(
    { _id: cid, "shoppingLists._id": listId },
    {
      $set: {
        "shoppingLists.$[element].wishedProducts": newShoppingList,
        "shoppingLists.$[element].title": newTitle,
      },
    },
    { arrayFilters: [{ "element._id": listId }] }
  );
};

exports.deleteOneShoppingListByIdDB = function (lid, cid) {
  let listId = mongoose.Types.ObjectId(lid);
  return Customer.updateOne(
    { _id: cid, "shoppingLists._id": listId },
    {
      $pull: { shoppingLists: { _id: listId } },
    },
    { multi: true }
  );
};

exports.deleteAllShoppingListsDB = function (cid) {
  return Customer.findOneAndUpdate(
    { _id: cid },
    {
      $set: { shoppingLists: [] },
    },
    { new: true }
  ).lean();
};

exports.pushSearchEntryToDB = function (_id, obj) {
  return Customer.findOneAndUpdate(
    { _id: _id },
    {
      $push: {
        searchHistory: obj,
      },
    },
    { new: true }
  ).lean();
};
