const ProductDataAccess = require("../dataAccess/product");
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const MainProduct = mongoose.model("MainProduct");
const APIFeatures = require("../util/apiFeatures");
const { isNullOrEmpty } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Messages = require("../util/messages");

exports.searchProductsService = async function ({ query, tags }) {
  let products = await ProductDataAccess.searchProducts(query, tags);
  if (isNullOrEmpty(products)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_SOMETHING_WENT_WRONG);
  }
  return { results: products.length, data: products };
};

exports.getSearchFiltersService = async function ({ query, tags }) {
  let products = await ProductDataAccess.getSearchFilters(query, tags);
  if (isNullOrEmpty(products)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_SOMETHING_WENT_WRONG);
  }
  return { data: products[0] };
};

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

exports.createProductService = async function ({ product }) {
  product.default = product.vendorSpecifics[0];
  const mainProduct = await MainProduct.findOne({ _id: product.parentProduct });
  if (isNullOrEmpty(mainProduct)) {
    return new AppError(Messages.RETURN_MESSAGES.ERR_MAIN_PRODUCT_DOES_NOT_EXIST);
  }
  // fill the tags field
  let tags = [...mainProduct.tags, ...product.tags];
  product.parameters.forEach((el) => tags.push(el.value));
  tags.push(mainProduct.brand, mainProduct.category);
  product.tags = [...new Set(tags.map((v) => v.toLowerCase()))];

  product.brand = mainProduct.brand;
  product.category = mainProduct.category;
  //create the product
  const newProduct = await Product.create(product);
  return { data: newProduct };
};

exports.getAllProductsService = async function ({ query }) {
  let features = new APIFeatures(Product.find(), query).filter().sort().limitFields().paginate();
  products = await features.query.populate({
    path: "vendorSpecifics.vendorID",
    ref: "Vendor",
    select: "_id companyName",
  });
  return { results: products.length, data: products };
};

exports.updateProductAmountLeftService = async function ({ productId, vendorId, amount }) {

  updatedProduct = await ProductDataAccess.updateProductAmountLeftDB(
    _id,
    productId,
    vendorId,
    amount
  );
  return updatedCustomer;
};
