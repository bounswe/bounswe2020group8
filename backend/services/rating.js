const VendorDataAccess = require("../dataAccess/vendor");
const mongoose = require("mongoose");

exports.patchRatingVendorService = async function (_id, _newRating) {
  const prevVendor = VendorDataAccess.getVendorByIdDB(_id);
  const prevRate = prevVendor.rating;
  const prevNumber = prevVendor.numberOfRating;
  let newRate = (prevRate * prevNumber + _newRating) / prevNumber + 1;
  let result = VendorDataAccess.updateVendorDB(_id, {
    rate: newRate,
    numberOfRating: prevNumber + 1,
  });
  return { data: result };
};
