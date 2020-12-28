const ShoppingCartService = require("../services/shoppingCart");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const factory = require("../services/crudFactory");
const Customer = require("../models/customer");
const OrderService = require("../services/order");

exports.createOrderController = BaseUtil.createController((req) => {
  let { _id } = req.body;
  return BB.all(OrderService.createOrderService({ _id }));
});

exports.getOrderByCustomerIdController = BaseUtil.createController((req) => {
  let { customerID } = req.body;
  if (typeof customerID === "undefined") {
    throw new Error("Missing Parameters!");
  }
  return BB.all(OrderService.getOrderByCustomerIdService({ customerID }));
});
