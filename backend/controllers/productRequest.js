const BaseUtil = require("../util/baseUtil");
const BB = require("bluebird");
const ProductRequest = require("../models/productRequest");
const factory = require("../services/crudFactory");
const AppValidator = require("../util/appValidator");
const Constants = require("./../util/constants");

//   .route("/")
exports.getAllProductRequestsController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.getAll(ProductRequest)(req));
});

//   .route("/:id")
exports.getOneProductRequestController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.getOne(ProductRequest)(req));
});

exports.updateOneProductRequestController = BaseUtil.createController((req) => {
  return BB.all([
    AppValidator.validateEnum(
      req.body.status,
      Object.values(Constants.ENUMS.STATUS),
      Messages.RETURN_MESSAGES.REQUEST_STATUS_IS_INVALID
    ).reflect(),
  ]).then(() => factory.updateOne(ProductRequest)(req));
});

exports.deleteOneProductRequestController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.deleteOne(ProductRequest)(req));
});
