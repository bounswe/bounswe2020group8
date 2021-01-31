const VendorDataAccess = require("../dataAccess/vendor");

exports.patchRatingVendorService = async function (_id, _newRating) {
  const prevVendor = await VendorDataAccess.getVendorByIdDB(_id);
  const prevRate = prevVendor.rating;
  const prevNumber = prevVendor.numberOfRating;
  let newRate = (prevRate * prevNumber + _newRating) / (prevNumber + 1);
  newRate = newRate.toFixed(2);
  let newNumber = prevNumber + 1;
  let result = await VendorDataAccess.updateVendorDB(_id, {
    rating: newRate,
    numberOfRating: newNumber,
  });
  return { data: result };
};
