const ShoppingCartService = require("../services/shoppingCart");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const factory = require("../services/crudFactory");
const Customer = require("../models/customer");
const OrderService = require("../services/order");

exports.createOrderController = BaseUtil.createController((req) => {
  let { _id } = req.query;
  // let { productId, vendorId, amount } = req.body;
  return BB.all(
    OrderService.createOrderService({ _id }),
  );
});

exports.updateShoppingCartController = BaseUtil.createController((req) => {
  let { _id } = req.query;
  let { productId, vendorId, amount } = req.body;
  return BB.all([
    ShoppingCartService.updateShoppingCartService({ _id, productId, vendorId, amount }),
  ]);
});

exports.deleteFromShoppingCartController = BaseUtil.createController((req) => {
  let { _id } = req.query;
  let { productId, vendorId } = req.body;
  return BB.all([ShoppingCartService.deleteFromShoppingCartService({ _id, productId, vendorId })]);
});

exports.resetShoppingCartController = BaseUtil.createController((req) => {
  let { _id } = req.query;
  return BB.all([ShoppingCartService.resetShoppingCartService({ _id })]);
});

exports.getShoppingCartController = BaseUtil.createController((req) => {
  let { _id } = req.query;
  return BB.all([ShoppingCartService.getShoppingCartService({ _id })]);
});
