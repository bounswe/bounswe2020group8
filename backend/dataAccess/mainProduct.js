const mongoose = require("mongoose");

const MainProduct = mongoose.model("MainProduct");
const Product = mongoose.model("Product");

exports.populateMainProductDB = function (obj, path = "mainProduct") {
  return MainProduct.populate(obj, {
    path,
    model: "MainProduct",
  });
};

exports.deleteMainProductByIdDB = function (_id) {
  return MainProduct.deleteOne({ _id });
};

exports.getMainProductByIdDB = function (_id) {
  return MainProduct.findById(_id).lean();
};

exports.createMainProductDB = function (mainProduct) {
  return MainProduct.create(mainProduct);
};

exports.getMainProductsByVendorDB = function (vendorID) {
  console.log(vendorID);
  return Product.aggregate([
    {
      $unwind: "$vendorSpecifics",
    },
    {
      $match: { "vendorSpecifics.vendorID": vendorID },
    },
    {
      $group: { _id: "$parentProduct" },
    },
    {
      $lookup: {
        from: "MainProducts",
        localField: "_id",
        foreignField: "_id",
        as: "data",
      },
    },
  ]);
};

exports.getVendorMainProductByMainProductIdDB = function (vendorID, mainProductID) {
  return MainProduct.aggregate([
    {
      $unwind: "$vendorSpecifics",
    },
    {
      $match: { _id: mainProductID, "vendors.vendorID": vendorID },
    },
    {
      $project: { default: 0 },
    },
  ]);
};

exports.updateMainProductDB = function (_id, fields) {
  return MainProduct.findByIdAndUpdate(
    _id,
    {
      $set: fields,
    },
    { _id: 1, new: true, runValidators: true }
  );
};
