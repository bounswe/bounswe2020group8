const VendorService = require("../services/vendor");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const Vendor = require("../models/vendor");
const ProductRequest = require("../models/productRequest");
const Constants = require("./../util/constants");

const factory = require("../services/crudFactory");

exports.signupController = BaseUtil.createController((req) => {
  let {
    email,
    password,
    passwordConfirm,
    name,
    lastName,
    companyName,
    companyDomainName,
  } = req.query;
  let { locations } = req.body;
  email = typeof email == "string" ? email.toLowerCase() : ""; // if it is not valid, validateEmail will reject it
  return BB.all([
    AppValidator.validatePassword(
      password,
      Messages.RETURN_MESSAGES.ERR_INVALID_PASSWORD
    ).reflect(),
    AppValidator.validateEmail(email, Messages.RETURN_MESSAGES.ERR_EMAIL_IS_INVALID).reflect(),
    AppValidator.validatePasswords(
      password,
      passwordConfirm,
      Messages.RETURN_MESSAGES.ERR_PASSWORDS_DO_NOT_MATCH
    ).reflect(),
    AppValidator.validateIfString(name, Messages.RETURN_MESSAGES.ERR_NAME_EMPTY).reflect(),
    AppValidator.validateIfString(lastName, Messages.RETURN_MESSAGES.ERR_LAST_NAME_EMPTY).reflect(),
    AppValidator.validateIfString(
      companyName,
      Messages.RETURN_MESSAGES.ERR_COMPANY_NAME_EMPTY
    ).reflect(),
    AppValidator.validateIfString(
      companyDomainName,
      Messages.RETURN_MESSAGES.ERR_COMPANY_DOMAIN_EMPTY
    ).reflect(),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      VendorService.signupService({
        email,
        password,
        name,
        lastName,
        companyName,
        companyDomainName,
        locations,
      })
    );
});

exports.getProfile = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    VendorService.getProfile({
      client: req.client,
    })
  );
});

exports.patchProfile = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    VendorService.patchProfile({
      client: req.client,
      data: req.body,
    })
  );
});

exports.freezeProfile = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    VendorService.freezeProfile({
      client: req.client,
      data: req.body,
    })
  );
});

exports.getAllVendorsController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.getAll(Vendor)(req));
});

exports.getOneVendorController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.getOne(Vendor)(req));
});

exports.updateOneVendorController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.updateOne(Vendor)(req));
});

exports.deleteOneVendorController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.deleteOne(Vendor)(req));
});

exports.getAllMyMainProductsController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    VendorService.getAllMyMainProductsService({
      vid: req.client._id,
    })
  );
});

exports.getAllMyProductsController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    VendorService.getAllMyProductsService({
      vid: req.client._id,
    })
  );
});

exports.getMyProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    VendorService.getMyProductService({
      vid: req.client._id,
      pid: req.params.id,
    })
  );
});

exports.updateMyProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    VendorService.updateMyProductService({
      vid: req.client._id,
      pid: req.params.id,
      data: req.body,
    })
  );
});

exports.deleteMyProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    VendorService.deleteMyProductService({
      vid: req.client._id,
      pid: req.params.id,
    })
  );
});

exports.deleteMeFromMainProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    VendorService.deleteMeFromMainProductService({
      vid: req.client._id,
      mpid: req.params.mpid,
    })
  );
});

exports.addMeToExistingProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    VendorService.addMeToExistingProductService({
      vid: req.client._id,
      pid: req.params.pid,
      data: req.body,
    })
  );
});

exports.createMyNewProductController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    VendorService.createMyNewProductService({
      vid: req.client._id,
      data: req.body,
    })
  );
});

exports.getAllMyProductRequestsController = BaseUtil.createController((req) => {
  req.query.vendorID = req.client._id;
  return BB.all([]).then(() => factory.getAll(ProductRequest)(req));
});

exports.getMyProductRequestController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.getOne(ProductRequest)(req));
});

exports.updateMyProductRequestController = BaseUtil.createController((req) => {
  const status = req.body.status;
  return BB.all([
    AppValidator.validateIfValEqual(
      status,
      "PENDING",
      Messages.RETURN_MESSAGES.ERR_UNAUTHORIZED_ACTION
    ),
  ]).then(() => factory.updateOne(ProductRequest)(req));
});

exports.deleteMyProductRequestController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.deleteOne(ProductRequest)(req));
});
