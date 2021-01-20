const ProductService = require("../services/product");
const BaseUtil = require("../util/baseUtil");
const BB = require("bluebird");
const Product = require("../models/product");
const factory = require("../services/crudFactory");
const { isEmpty } = require("underscore");

exports.searchProductsController = BaseUtil.createController((req) => {
  if (typeof req.body.query == "string") {
    req.body.query = req.body.query.trim();
  }
  if (!isEmpty(req.body.query)) {
    var tags = req.body.query.toLowerCase().split(/[ \t\n]+/);
  }
  req.custom.tags = tags;

  return BB.all([]).then(() =>
    ProductService.searchProductsService({
      query: req.query,
      tags,
    })
  );
});

exports.getProductRecommendationController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    ProductService.getProductRecommendationService({
      pid: req.params.id,
    })
  );
});

exports.getSearchFiltersController = BaseUtil.createController((req) => {
  let tags = req.body.query
    .trim()
    .toLowerCase()
    .split(/[ \t\n]+/);
  return BB.all([]).then(() =>
    ProductService.getSearchFiltersService({
      query: req.query,
      tags,
    })
  );
});

//   .route("/")
exports.getAllProductsController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => ProductService.getAllProductsService({ query: req.query }));
});

exports.createProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    ProductService.createProductService({
      product: req.body,
    })
  );
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
