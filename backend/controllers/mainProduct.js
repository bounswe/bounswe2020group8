const MainProductService = require("../services/mainProduct");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const MainProduct = require("../models/mainProduct");
const factory = require("../services/crudFactory");

exports.getAllMainProducts = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.getAll(MainProduct)(req));
});

exports.createMainProduct = BaseUtil.createController((req) => {
  const isConfirmed = req.body.isConfirmed;

  return BB.all([
    AppValidator.validateIfValEqual(
      isConfirmed,
      false,
      Messages.RETURN_MESSAGES.ERR_UNAUTHORIZED_ACTION
    ),
  ]).then(() => factory.createOne(MainProduct)(req));
});

exports.getOneMainProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.getOne(MainProduct)(req));
});
exports.updateOneMainProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.updateOne(MainProduct)(req));
});
exports.deleteOneMainProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    MainProductService.deleteOneMainProductService({
      mpid: req.params.id,
    })
  );
});
exports.deleteVendorFromMainProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    MainProductService.deleteVendorFromMainProductService({
      mpid: req.params.mpid,
      vid: req.params.vid,
    })
  );
});
