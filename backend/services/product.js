const ProductDataAccess = require("../dataAccess/product");
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const MainProduct = mongoose.model("MainProduct");
const APIFeatures = require("../util/apiFeatures");
const { isNullOrEmpty } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Messages = require("../util/messages");
const Constants = require("../util/constants");
const got = require("got");
const ProductTracker = require("../util/productTracker");

/*
Searchs for products related to tags, it queries the semantic search API of datamuse to gather
other related words with the tags. Then it queries the database for related products.
*/
async function getRelatedTags(tags) {
  tags_string = tags.join("+");
  let response_body = (
    await got(`https://api.datamuse.com/words?ml=${tags_string}`, {
      json: true,
    })
  ).body;
  new_tags = response_body
    .filter((el) => {
      if (el.tags) {
        return el.tags.indexOf("v") == -1;
      } else {
        return true;
      }
    })
    .splice(0, 10)
    .map((el) => {
      return el.word;
    });
  return new_tags;
}

exports.searchProductsService = async function ({ query, tags }) {
  if (!isNullOrEmpty(tags)) {
    tags = tags.filter((el) => {
      return Constants.BASIC_COLORS.indexOf(el) == -1;
    });
    new_tags = await getRelatedTags(tags);
    tags = tags.concat(new_tags);
  }

  let products = await ProductDataAccess.searchProducts(query, tags);
  if (isNullOrEmpty(products)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_SOMETHING_WENT_WRONG);
  }
  return { results: products.length, data: products };
};

exports.getProductRecommendationService = async function ({ pid }) {
  let product = await ProductDataAccess.getProductByIdDB(pid);
  if (isNullOrEmpty(product)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_SOMETHING_WENT_WRONG);
  }
  let { tags, parentProduct } = product;
  if (!isNullOrEmpty(tags)) {
    tags = tags.filter((el) => {
      return Constants.BASIC_COLORS.indexOf(el) == -1;
    });
  }
  new_tags = await getRelatedTags(tags);
  tags = tags.concat(new_tags);

  recIndex = tags.indexOf("hotsellers");
  if (recIndex != 1) {
    tags.splice(recIndex, 1);
  }
  trendIndex = tags.indexOf("trendings");
  if (trendIndex != 1) {
    tags.splice(trendIndex, 1);
  }
  query = {};
  let products = await ProductDataAccess.searchProducts(query, tags);
  products = products.filter((el) => el.mpid.toString() != parentProduct.toString());
  return { results: products.length, data: products };
};

exports.getSearchFiltersService = async function ({ query, tags }) {
  if (!isNullOrEmpty(tags)) {
    tags = tags.filter((el) => {
      return Constants.BASIC_COLORS.indexOf(el) == -1;
    });
    new_tags = await getRelatedTags(tags);
    tags = tags.concat(new_tags);
  }
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
  await ProductTracker.registerProductInfo({ pid, vid, vendorData });
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
