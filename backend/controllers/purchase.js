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
  let { _id, shippingAddressId, billingAddressId,creditCardId } = req.body;

  if((typeof _id === "undefined") || (typeof shippingAddressId === "undefined") || (typeof billingAddressId === "undefined") || (typeof creditCardId === "undefined")){
    throw new Error('Missing Parameters!');

  }
  return BB.all([
    PurchaseService.purchaseService({ _id, shippingAddressId, billingAddressId, creditCardId }),
  ]);

});

// exports.purchaseController = BaseUtil.createController((req) => {
//   let { _id, shippingAddressId, billingAddressId,creditCardId } = req.body;
//   return BB.all([
//     CoreUtil.isNullOrEmpty(billingAddressId,Messages.RETURN_MESSAGES.ERR_UNDEFINED
//   ).reflect(),
//   ])
//   .then((results) => BaseUtil.decideErrorExist(results))
//   .then(() =>
//     PurchaseService.purchaseService({ _id, shippingAddressId, billingAddressId, creditCardId })
//   );
// });

// return BB.all([
//   PurchaseService.purchaseService({ _id, shippingAddressId, billingAddressId, creditCardId }),
// ]);

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
  return BB.all(ShoppingCartService.getShoppingCartService({ _id }));
});
