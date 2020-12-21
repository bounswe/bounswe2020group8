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

exports.addToCartService = async function ({ id, productId, vendorId, amount}) {
  console.log("addToCartService");
  console.log(id);
  const updatedCustomer1 = await CustomerDataAccess.updateCustomerCartDB1(id, productId, vendorId, amount);
  const updatedCustomer2 = await CustomerDataAccess.updateCustomerCartDB2(id, productId, vendorId, amount);
};
