const mongoose = require("mongoose");

const ProductRequest = mongoose.model("ProductRequest");

exports.populateProductRequestDB = function (obj, path = "productRequest") {
  return ProductRequest.populate(obj, {
    path,
    model: "ProductRequest",
  });
};
exports.createProductRequestDB = function (productRequest) {
  return ProductRequest.create(productRequest);
};
exports.getProductRequestByIdDB = function (_id) {
  return ProductRequest.findById(_id).lean();
};

exports.updateProductRequestDB = function (_id, fields) {
  return ProductRequest.findByIdAndUpdate(
    _id,
    {
      $set: fields,
    },
    { _id: 1, new: true, runValidators: true }
  );
};
