const ListService = require("../services/list");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const Customer = require("../models/customer");

exports.getWatchListController = BaseUtil.createController((req) => {
  let _id = req.client._id;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => ListService.getWatchListService(_id));
});

exports.addProductToWatchListController = BaseUtil.createController((req) => {
  let _id = req.client._id;
  let product_info = req.body;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => ListService.addProductToWatchListService(_id, product_info));
});

exports.removeProductFromWatchListController = BaseUtil.createController((req) => {
  let _id = req.client._id;
  let product_info = req.body;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => ListService.removeProductFromWatchListService(_id, product_info));
});

exports.getOneListController = BaseUtil.createController((req) => {
  let _id = req.params.lid;
  let customer = req.client;
  return BB.all([]).then(() => ListService.getOneListService(_id, customer));
});

exports.createOneListController = BaseUtil.createController((req) => {
  let { title, wishedProducts } = req.body;
  let customer = req.client;
  return BB.all([]).then(() => ListService.createOneListService(title, wishedProducts, customer));
});

exports.updateOneListController = BaseUtil.createController((req) => {
  let _id = req.params.lid;
  let { title, wishedProducts } = req.body;
  let customer = req.client;
  return BB.all([]).then(() =>
    ListService.updateOneListService(_id, customer, title, wishedProducts)
  );
});

exports.deleteOneListController = BaseUtil.createController((req) => {
  let _id = req.params.lid;
  let customer = req.client;
  return BB.all([]).then(() => ListService.deleteOneListService(_id, customer));
});

exports.getAllListsController = BaseUtil.createController((req) => {
  let customer = req.client;
  return BB.all([]).then(() => ListService.getAllListsService(customer));
});

exports.deleteAllListsController = BaseUtil.createController((req) => {
  let customer = req.client;
  return BB.all([]).then(() => ListService.deleteAllListsService(customer));
});

exports.exportOneListController = BaseUtil.createController((req) => {
  let _id = req.params.lid;
  let customer = req.client;
  return BB.all([]).then(() => ListService.exportOneListService(_id, customer));
});

exports.exportAllListsController = BaseUtil.createController((req) => {
  let customer = req.client;
  return BB.all([]).then(() => ListService.exportAllListsService(customer));
});
