const MainProductDataAccess = require("../dataAccess/mainProduct");
const mongoose = require("mongoose");

exports.patchRatingProductService = async function (_id, _newRating) {
  let currentMainProduct = await MainProductDataAccess.getMainProductByIdDB(_id);
  let currentRateSum = currentMainProduct.numberOfRating * currentMainProduct.rating;
  let newNumberOfRating = currentMainProduct.numberOfRating + 1;
  let newRating = (currentRateSum + _newRating) / newNumberOfRating;
  newRating = newRating.toFixed(2);
  const updatedMainProduct = (
    await MainProductDataAccess.updateMainProductDB(_id, {
      rating: newRating,
      numberOfRating: newNumberOfRating,
    })
  ).toObject();
  return updatedMainProduct;
};
