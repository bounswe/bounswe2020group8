const BaseUtil = require("../util/baseUtil");
const BB = require("bluebird");
const factory = require("../services/crudFactory");
const Category = require("../models/category");

exports.getAllCategoryController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.getAll(Category)(req));
});

exports.getOneCategoryController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.getOne(Category)(req));
});

exports.createOneCategoryController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.createOne(Category)(req));
});

exports.updateOneCategoryController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.updateOne(Category)(req));
});

exports.deleteOneCategoryController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.deleteOne(Category)(req));
});
