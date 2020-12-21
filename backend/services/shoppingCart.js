const CustomerDataAccess = require("../dataAccess/customer");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const Messages = require("../util/messages");
const { sha1, sha256 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
const sendEmail = require("../util/emailer");
const Config = require("../config");
//

exports.updateShoppingCartService = async function ({ id, productId, vendorId, amount}) {
  updatedCustomer = await CustomerDataAccess.addToCustomerShoppingCartDB(id, productId, vendorId, amount);
  updatedCustomer = await CustomerDataAccess.updateCustomerShoppingCartDB(id, productId, vendorId, amount);
  return updatedCustomer;
};
