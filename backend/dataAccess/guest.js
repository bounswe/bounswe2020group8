const mongoose = require("mongoose");
const GuestShoppingCart = mongoose.model("GuestShoppingCart");

exports.populateGuestShoppingCartDB = function (data, path = "GuestShoppingCart") {
  shoppingCart = new GuestShoppingCart();
  shoppingCart["_id"] = data["_id"];
  shoppingCart["lastActivity"] = data["date"];
  shoppingCart.save(function (err) {
    if (err) return handleError(err);
  });
  return shoppingCart;
};

exports.addToGuestShoppingCartDB = function (
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
  return GuestShoppingCart.findOneAndUpdate(
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

exports.updateGuestShoppingCartDB = function (_id, productId, vendorId, amount) {
  return GuestShoppingCart.findOneAndUpdate(
    { _id: _id, shoppingCart: { $elemMatch: { productId: productId, vendorId: vendorId } } },
    {
      $set: {
        "shoppingCart.$.amount": amount,
        lastActivity: Date.now(),
      },
    },
    { new: true }
  );
};

exports.updateGuestShoppingCartActivityDB = function (_id) {
  return GuestShoppingCart.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        lastActivity: Date.now(),
      },
    },
    { new: true }
  );
};

exports.deleteFromGuestShoppingCartDB = function (_id, productId, vendorId) {
  return GuestShoppingCart.findOneAndUpdate(
    { _id: _id },
    {
      $pull: {
        shoppingCart: {
          productId: mongoose.Types.ObjectId(productId),
          vendorId: mongoose.Types.ObjectId(vendorId),
        },
      },
    },
    { new: true }
  );
};

exports.resetGuestShoppingCartDB = function (_id) {
  return GuestShoppingCart.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        shoppingCart: [],
      },
    },
    { new: true }
  );
};

exports.getGuestShoppingCartDB = function (_id) {
  return GuestShoppingCart.findById({ _id: _id }).select("shoppingCart");
};
