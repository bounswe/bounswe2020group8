const CustomerDataAccess = require("../dataAccess/customer");
const ProductDataAccess = require("../dataAccess/product");
const OrderService = require("../services/order");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const { sha1, sha256 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
const Config = require("../config");

exports.purchaseService = async function ({ _id, addressId, creditCardId }) {
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
    var current_address;
    current_address = (await CustomerDataAccess.getAddressByIdDB(_id, addressId)).toJSON();
    current_address = current_address['addresses'][0];
    // current_address._id = undefined;
    delete current_address["_id"];
    current['address'] = current_address;

    var creditCard;
    creditCard = (await CustomerDataAccess.getCreditCardByIdDB(_id, creditCardId)).toJSON();
    creditCard = creditCard['creditCards'][0];
    // creditCard._id = undefined;
    delete creditCard["_id"];
    current['creditCard'] = creditCard;
    f_items.push(current);
  }
  return f_items;
};

exports.getShoppingCartService = async function ({ _id }) {
  const shoppingCart = await CustomerDataAccess.getCustomerShoppingCartDB(_id);
  return shoppingCart["shoppingCart"];
};
