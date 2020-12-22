const CustomerDataAccess = require("../dataAccess/customer");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const { sha1, sha256 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
const Config = require("../config");

exports.updateShoppingCartService = async function ({ id, productId, vendorId, amount }) {
  updatedCustomer = await CustomerDataAccess.addToCustomerShoppingCartDB(
    id,
    productId,
    vendorId,
    amount
  );
  updatedCustomer = await CustomerDataAccess.updateCustomerShoppingCartDB(
    id,
    productId,
    vendorId,
    amount
  );
  return updatedCustomer;
};

exports.deleteFromShoppingCartService = async function ({ id, productId, vendorId }) {
  const updatedCustomer = await CustomerDataAccess.deleteFromCustomerShoppingCartDB(
    id,
    productId,
    vendorId
  );
  return updatedCustomer;
};

exports.resetShoppingCartService = async function ({ id }) {
  const updatedCustomer = await CustomerDataAccess.resetCustomerShoppingCartDB(id);
  return updatedCustomer;
};

exports.getShoppingCartService = async function ({ id }) {
  const shoppingCart = await CustomerDataAccess.getCustomerShoppingCartDB(id);
  return shoppingCart;
};
