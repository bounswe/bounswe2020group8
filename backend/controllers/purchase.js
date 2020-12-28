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
  return BB.all([
    AppValidator.validateIfNullOrEmpty(_id, Messages.RETURN_MESSAGES.ERR_UNDEFINED).reflect(),
    AppValidator.validateIfNullOrEmpty(
      shippingAddressId,
      Messages.RETURN_MESSAGES.ERR_UNDEFINED
    ).reflect(),
    AppValidator.validateIfNullOrEmpty(
      billingAddressId,
      Messages.RETURN_MESSAGES.ERR_UNDEFINED
    ).reflect(),
    AppValidator.validateIfNullOrEmpty(creditCardId, Messages.RETURN_MESSAGES.ERR_UNDEFINED),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      PurchaseService.purchaseService({ _id, shippingAddressId, billingAddressId, creditCardId })
    );
});
