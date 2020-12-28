const CustomerService = require("../services/customer");
const ShoppingCartService = require("../services/shoppingCart");
const PurchaseService = require("../services/purchase");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const CoreUtil = require("../util/coreUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const factory = require("../services/crudFactory");
const Customer = require("../models/customer");

exports.purchaseController = BaseUtil.createController((req) => {
  let { _id, shippingAddressId, billingAddressId, creditCardId } = req.body;

  if (
    typeof _id === "undefined" ||
    typeof shippingAddressId === "undefined" ||
    typeof billingAddressId === "undefined" ||
    typeof creditCardId === "undefined"
  ) {
    throw new Error("Missing Parameters!");
  }
  return BB.all([
    PurchaseService.purchaseService({ _id, shippingAddressId, billingAddressId, creditCardId }),
  ]);
});
