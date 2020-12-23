const MainProductDataAccess = require("../dataAccess/mainProduct");
const ProductDataAccess = require("../dataAccess/product");

// We will need to check if there exists any order for the  product vendor sells thay hasn't been delivered.
exports.deleteOneMainProductService = async function ({ mpid }) {
  await MainProductDataAccess.deleteMainProductByIdDB(mpid);
  await ProductDataAccess.deleteProductsByParentIdDB(mpid);
  return {};
};

exports.deleteVendorFromMainProductService = async function ({ mpid, vid }) {
  try {
    await ProductDataAccess.deleteVendorFromProductsByVendorIdDB(mpid, vid);
    return {};
  } catch (error) {
    console.log(error);
    throw error;
  }
};
