const CustomerDataAccess = require("../dataAccess/customer");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const { sha1, sha256 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
const Config = require("../config");
const ProductDataAccess = require("../dataAccess/product");

exports.createOrderService = async function ({ _id }) {
  // console.log("Start!!!!!!!!!!!");
  const shoppingCart = await CustomerDataAccess.getCustomerShoppingCartDB(_id);
  var items = [];
  var i;
  for (i = 0; i < shoppingCart['shoppingCart'].length; i++){
    current = shoppingCart['shoppingCart'][i];
    console.log(current['productId']);
    const current_product = await ProductDataAccess.getProductByVendorIdDB2(current['productId'], current['vendorId']);
    console.log(current_product);
    // items.push(current_product['vendorSpecifics'])
    console.log('here');
  }
  // console.log(shoppingCart['shoppingCart'][0]);
  // console.log(items);
  // console.log("HEREEEEEEEEEEEEEEEEEE");
  return shoppingCart;
};

exports.updateShoppingCartService = async function ({ _id, productId, vendorId, amount }) {
  updatedCustomer = await CustomerDataAccess.addToCustomerShoppingCartDB(
    _id,
    productId,
    vendorId,
    amount
  );
  updatedCustomer = await CustomerDataAccess.updateCustomerShoppingCartDB(
    _id,
    productId,
    vendorId,
    amount
  );
  return updatedCustomer;
};

exports.deleteFromShoppingCartService = async function ({ _id, productId, vendorId }) {
  const updatedCustomer = await CustomerDataAccess.deleteFromCustomerShoppingCartDB(
    _id,
    productId,
    vendorId
  );
  return updatedCustomer;
};

exports.resetShoppingCartService = async function ({ _id }) {
  const updatedCustomer = await CustomerDataAccess.resetCustomerShoppingCartDB(_id);
  return updatedCustomer;
};

exports.getShoppingCartService = async function ({ _id }) {
  const shoppingCart = await CustomerDataAccess.getCustomerShoppingCartDB(_id);
  return shoppingCart;
};
