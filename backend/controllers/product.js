const ProductService = require("../services/product");
const BaseUtil = require("../util/baseUtil");
const BB = require("bluebird");
const Product = require("../models/product");
const factory = require("../services/crudFactory");

exports.searchProducts = BaseUtil.createController((req) => {});

//   .route("/")
exports.getAllProductsController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.getAll(Product)(req));
});

exports.createProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.createOne(Product)(req));
});

//   .route("/:id")
exports.getOneProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.getOne(Product)(req));
});

exports.addVendorToProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    ProductService.addVendorToProductService({
      pid: req.params.id,
      vendorData: req.body,
    })
  );
});

exports.updateOneProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.updateOne(Product)(req));
});

exports.deleteOneProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.deleteOne(Product)(req));
});

//  .route("/:pid/vendor/:vid")
exports.deletevendorFromProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    ProductService.deleteVendorFromProductService({
      pid: req.params.pid,
      vid: req.params.vid,
    })
  );
});
exports.updateVendorInProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    ProductService.updateVendorInProductService({
      pid: req.params.pid,
      vid: req.params.vid,
      vendorData: req.body,
    })
  );
});
