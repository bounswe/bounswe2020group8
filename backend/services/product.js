const ProductDataAccess = require("../dataAccess/product");

exports.addVendorToProductService = async function ({ pid, vendorData }) {
  const updatedProduct = await ProductDataAccess.addVendorToProductDB(pid, vendorData);
  return { data: updatedProduct };
};
// We will need to check if there exists any order for the  product vendor sells that hasn't been delivered.
exports.deleteVendorFromProductService = async function ({ pid, vid }) {
  await ProductDataAccess.deleteVendorFromProductByVendorIdDB(pid, vid);
  return {};
};

exports.updateVendorInProductService = async function ({ pid, vid, vendorData }) {
  const updatedProduct = await ProductDataAccess.updateVendorInProductByVendorIdDB(
    pid,
    vid,
    vendorData
  );
  return { data: updatedProduct };
};
