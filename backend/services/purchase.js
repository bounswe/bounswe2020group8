const CustomerDataAccess = require("../dataAccess/customer");
const ProductDataAccess = require("../dataAccess/product");
const OrderService = require("../services/order");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const { sha1, sha256 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
const Config = require("../config");

exports.purchaseService = async function ({ _id }) {
  console.log(_id);
  const items = await OrderService.createOrderService({ _id });
  var f_items = [];
  var i;
  for (i = 0; i < items.length; i++) {
    current = items[i];
    if (current["enoughLeft"]) {
      updatedProduct = await ProductDataAccess.updateProductAmountLeftDB(
        current["productId"],
        current["vendorId"],
        current["amount"]*-1
      );
    }
    f_items.push(current);
  }
  return f_items;
};

exports.getShoppingCartService = async function ({ _id }) {
  const shoppingCart = await CustomerDataAccess.getCustomerShoppingCartDB(_id);
  return shoppingCart["shoppingCart"];
};
