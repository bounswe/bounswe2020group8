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
  return BB.all(OrderService.createOrderService({ _id }));
});
