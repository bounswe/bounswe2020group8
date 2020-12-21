const CustomerService = require("../services/customer");
const ShoppingCartService = require("../services/shoppingCart");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const factory = require("../services/crudFactory");
const Customer = require("../models/customer");


exports.updateShoppingCartController = BaseUtil.createController((req) => {
  let { id, productId, vendorId, amount} = req.query;
  return BB.all([ShoppingCartService.updateShoppingCartService({id, productId, vendorId, amount})]);
});

exports.deleteFromShoppingCartController = BaseUtil.createController((req) => {
  let { id, productId, vendorId} = req.query;
  return BB.all([ShoppingCartService.deleteFromShoppingCartService({id, productId, vendorId})]);
});
