const mongoose = require("mongoose");
const CustomerDataAccess = require("../dataAccess/customer");
const ProductDataAccess = require("../dataAccess/product");
const OrderDataAccess = require("../dataAccess/order");
const OrderService = require("../services/order");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const { sha1, sha256 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
const Config = require("../config");

exports.purchaseService = async function ({
  _id,
  shippingAddressId,
  billingAddressId,
  creditCardId,
}) {
  var items = await OrderService.createOrderService({ _id });
  items = items["data"];
  console.log(items);
  var f_items = [];
  var i;
  for (i = 0; i < items.length; i++) {
    current = items[i];
    if (current["enoughLeft"]) {
      updatedProduct = await ProductDataAccess.updateProductAmountLeftDB(
        current["productId"],
        current["vendorId"],
        current["amount"] * -1
      );
    }

    var current_shipping_address;
    current_shipping_address = (
      await CustomerDataAccess.getAddressByIdDB(_id, shippingAddressId)
    ).toJSON();
    current_shipping_address = current_shipping_address["addresses"][0];
    delete current_shipping_address["_id"];
    current["shippingAddress"] = current_shipping_address;

    var current_billing_address;
    current_billing_address = (
      await CustomerDataAccess.getAddressByIdDB(_id, billingAddressId)
    ).toJSON();
    current_billing_address = current_billing_address["addresses"][0];
    delete current_billing_address["_id"];
    current["billingAddress"] = current_billing_address;

    var creditCard;
    creditCard = (await CustomerDataAccess.getCreditCardByIdDB(_id, creditCardId)).toJSON();
    creditCard = creditCard["creditCards"][0];
    delete creditCard["_id"];
    current["creditCard"] = creditCard;
    var orderId = mongoose.Types.ObjectId();
    current["_id"] = orderId;
    delete current["enoughLeft"];
    current["status"] = "being prepared";
    f_items.push(current);
  }
  var mainOrderId = mongoose.Types.ObjectId();
  date = Date.now();
  data = { _id: mainOrderId, orders: f_items, customerID: _id, createdAt: date };
  newOrder = await OrderDataAccess.populateOrderDB(data);
  return newOrder;
};

exports.purchaseGuestService = async function ({
  _id,
  shippingAddress,
  billingAddress,
  creditCard,
}) {
  var items = await OrderService.createGuestOrderService({ _id });
  items = items["data"];
  var f_items = [];
  var i;
  for (i = 0; i < items.length; i++) {
    current = items[i];
    if (current["enoughLeft"]) {
      updatedProduct = await ProductDataAccess.updateProductAmountLeftDB(
        current["productId"],
        current["vendorId"],
        current["amount"] * -1
      );
    }

    current["shippingAddress"] = shippingAddress;
    current["billingAddress"] = billingAddress;
    current["creditCard"] = creditCard;
    var orderId = mongoose.Types.ObjectId();
    current["_id"] = orderId;
    delete current["enoughLeft"];
    current["status"] = "being prepared";
    f_items.push(current);
  }
  var mainOrderId = mongoose.Types.ObjectId();
  date = Date.now();
  data = { _id: mainOrderId, orders: f_items, customerID: _id, createdAt: date };
  newOrder = await OrderDataAccess.populateOrderDB(data);
  return newOrder;
};
