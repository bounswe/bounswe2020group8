const BaseUtil = require("../util/baseUtil");
const BB = require("bluebird");
const AdminService = require("../services/admin");
const AppValidator = require("../util/appValidator");

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
    .then(() => AdminService.getAllActivitiesService());
});

exports.getOneActivityController = BaseUtil.createController((req) => {
  let _id = req.params.aid;
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => AdminService.getOneActivityService(_id));
});

exports.getAllAdminInfoController = BaseUtil.createController((req) => {
  let client = req.client;
  return BB.all([AppValidator.ValidateAdminStatus(client).reflect()])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => AdminService.getAllAdminInfoService());
});
