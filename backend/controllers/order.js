const ShoppingCartService = require("../services/shoppingCart");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const factory = require("../services/crudFactory");
const Customer = require("../models/customer");
const OrderService = require("../services/order");

exports.createOrderController = BaseUtil.createController((req) => {
  let { _id } = req.client;
  return BB.all([OrderService.createOrderService({ _id })]);
});

exports.updateOrderStatusCustomerController = BaseUtil.createController((req) => {
  let { _id } = req.client;
  let { mainOrderID, orderID, status } = req.body;
  return BB.all([
    AppValidator.validateOrderStatus(status, Messages.RETURN_MESSAGES.ERR_ORDER_STATUS_IS_INVALID),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      OrderService.updateOrderStatusCustomerService({ _id, mainOrderID, orderID, status })
    );
});

// exports.updateOrderStatusCustomerController = BaseUtil.createController((req) => {
//   let { _id } = req.client;
//   let { mainOrderID, orderID, status } = req.body;
//   return BB.all([
//     OrderService.updateOrderStatusCustomerService({ _id, mainOrderID, orderID, status }),
//   ]);
// });

exports.updateOrderStatusVendorController = BaseUtil.createController((req) => {
  let { _id } = req.client;
  let { mainOrderID, orderID, status } = req.body;
  // return BB.all([
  //   OrderService.updateOrderStatusVendorService({ _id, mainOrderID, orderID, status }),
  // ]);
  return BB.all([
    AppValidator.validateOrderStatus(status, Messages.RETURN_MESSAGES.ERR_ORDER_STATUS_IS_INVALID),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      OrderService.updateOrderStatusVendorService({ _id, mainOrderID, orderID, status })
    );
});

exports.updateOrderStatusGuestController = BaseUtil.createController((req) => {
  let { mainOrderID, orderID, status } = req.body;
  // return BB.all([OrderService.updateOrderStatusGuestService({ mainOrderID, orderID, status })]);
  return BB.all([
    AppValidator.validateOrderStatus(status, Messages.RETURN_MESSAGES.ERR_ORDER_STATUS_IS_INVALID),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      OrderService.updateOrderStatusGuestService({ mainOrderID, orderID, status })
    );
});

exports.getOrderByCustomerIdController = BaseUtil.createController((req) => {
  let { _id } = req.client;
  return BB.all([AppValidator.validateIfNullOrEmpty(_id, Messages.RETURN_MESSAGES.ERR_UNDEFINED)])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => OrderService.getOrderByCustomerIdService({ _id }));
});

exports.getOrderByVendorIdController = BaseUtil.createController((req) => {
  let { _id } = req.client;
  _id = _id.toString();
  return BB.all([AppValidator.validateIfNullOrEmpty(_id, Messages.RETURN_MESSAGES.ERR_UNDEFINED)])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => OrderService.getOrderByVendorIdService({ _id }));
});

exports.getVendorBalanceController = BaseUtil.createController((req) => {
  let { _id } = req.client;
  _id = _id.toString();
  return BB.all([AppValidator.validateIfNullOrEmpty(_id, Messages.RETURN_MESSAGES.ERR_UNDEFINED)])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => OrderService.getVendorBalanceService({ _id }));
});

exports.getOrderByOrderIdController = BaseUtil.createController((req) => {
  let { mainOrderID, orderID } = req.body;
  return BB.all([
    AppValidator.validateIfNullOrEmpty(
      mainOrderID,
      Messages.RETURN_MESSAGES.ERR_UNDEFINED
    ).reflect(),
    AppValidator.validateIfNullOrEmpty(orderID, Messages.RETURN_MESSAGES.ERR_UNDEFINED),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => OrderService.getOrderByOrderIdService({ mainOrderID, orderID }));
});
