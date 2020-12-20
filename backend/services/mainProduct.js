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
    let emptyProductIDs = await ProductDataAccess.deleteVendorFromProductsByVendorIdDB(mpid, vid);
    console.log(emptyProductIDs);
    //await ProductDataAccess.deleteProductsByIdDB(emptyProductIDs);
    return {};
  } catch (error) {
    console.log(error);
    return { error: "error occured" };
  }
};
