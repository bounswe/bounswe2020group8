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
  return BB.all([
    AppValidator.validateIfNullOrEmpty(customerID, Messages.RETURN_MESSAGES.ERR_UNDEFINED),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => OrderService.getOrderByCustomerIdService({ customerID }));
});

exports.getOrderByOrderIdController = BaseUtil.createController((req) => {
  let { mainOrderID, orderID } = req.body;
  return BB.all([
    AppValidator.validateIfNullOrEmpty(mainOrderID, Messages.RETURN_MESSAGES.ERR_UNDEFINED).reflect(),
    AppValidator.validateIfNullOrEmpty(orderID, Messages.RETURN_MESSAGES.ERR_UNDEFINED)
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => OrderService.getOrderByOrderIdService({ mainOrderID, orderID }));
});
