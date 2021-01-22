const CustomerService = require("../services/customer");
const ShoppingCartService = require("../services/shoppingCart");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const factory = require("../services/crudFactory");
const Customer = require("../models/customer");

exports.updateShoppingCartController = BaseUtil.createController((req) => {
  let { _id } = req.client;
  let { productId, vendorId, amount } = req.body;
  return BB.all([
    AppValidator.validateIfNullOrEmpty(_id, Messages.RETURN_MESSAGES.ERR_UNDEFINED).reflect(),
    AppValidator.validateIfNullOrEmpty(productId, Messages.RETURN_MESSAGES.ERR_UNDEFINED).reflect(),
    AppValidator.validateIfNullOrEmpty(vendorId, Messages.RETURN_MESSAGES.ERR_UNDEFINED).reflect(),
    AppValidator.validateIfNullOrEmpty(amount, Messages.RETURN_MESSAGES.ERR_UNDEFINED),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      ShoppingCartService.updateShoppingCartService({ _id, productId, vendorId, amount })
    );
});

exports.deleteFromShoppingCartController = BaseUtil.createController((req) => {
  let { _id } = req.client;
  let { productId, vendorId } = req.body;
  return BB.all([ShoppingCartService.deleteFromShoppingCartService({ _id, productId, vendorId })]);
});

exports.resetShoppingCartController = BaseUtil.createController((req) => {
  let { _id } = req.client;
  return BB.all([ShoppingCartService.resetShoppingCartService({ _id })]);
});

exports.getShoppingCartController = BaseUtil.createController((req) => {
  let { _id } = req.client;
  return BB.all([ShoppingCartService.getShoppingCartService({ _id })]);
});
