const BaseUtil = require("../util/baseUtil");
const BB = require("bluebird");
const AdminService = require("../services/admin");
const AppValidator = require("../util/appValidator");
const Factory = require("../services/crudFactory");
const Activity = require("../models/activity");

exports.loginController = BaseUtil.createController((req) => {
  let { email, password } = req.query;
  return BB.all([]).then(() =>
    AdminService.loginService({
      email,
      password,
    })
  );
});

exports.logoutController = BaseUtil.createController((req) => {
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      AdminService.logoutService({
        tokenCode: req.tokenCode,
      })
    );
});

exports.getAllActivitiesController = BaseUtil.createController((req) => {
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => Factory.getAll(Activity)(req));
});

exports.getOneActivityController = BaseUtil.createController((req) => {
  let _id = req.params.aid;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => AdminService.getOneActivityService(_id));
});

exports.getAdminInfoController = BaseUtil.createController((req) => {
  let client = req.client;
  return BB.all([AppValidator.ValidateAdminStatus(client).reflect()])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => AdminService.getAdminInfoService(client));
});
