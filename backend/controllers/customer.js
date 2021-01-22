const CustomerService = require("../services/customer");
const CustomerDataAccess = require("../dataAccess/customer");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const factory = require("../services/crudFactory");
const Customer = require("../models/customer");
const { isNullOrEmpty } = require("../util/coreUtil");
const AppError = require("../util/appError");

exports.signupController = BaseUtil.createController((req) => {
  let { email, password, passwordConfirm, name, lastName } = req.query;
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
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      CustomerService.signupService({
        email,
        password,
        name,
        lastName,
      })
    );
});

exports.signupWithGoogleController = BaseUtil.createController((req) => {
  let { email, googleID } = req.query;
  email = typeof email == "string" ? email.toLowerCase() : ""; // if it is not valid, validateEmail will reject it
  return BB.all([
    AppValidator.validateEmail(email, Messages.RETURN_MESSAGES.ERR_EMAIL_IS_INVALID).reflect(),
    AppValidator.validateIfString(googleID, Messages.RETURN_MESSAGES.ERR_INVALID_GOOGLE_ID),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      CustomerService.signupWithGoogleService({
        email,
        googleID,
      })
    );
});

exports.loginWithGoogleController = BaseUtil.createController((req) => {
  let { email, googleID } = req.query;

  email = typeof email == "string" ? email.toLowerCase() : ""; // if it is not valid, validateEmail will reject it
  return BB.all([
    AppValidator.validateEmail(email, Messages.RETURN_MESSAGES.ERR_EMAIL_IS_INVALID).reflect(),
    AppValidator.validateIfString(googleID, Messages.RETURN_MESSAGES.ERR_INVALID_GOOGLE_ID),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      CustomerService.loginWithGoogleService({
        email,
        googleID,
      })
    );
});

exports.getProfile = BaseUtil.createController((req) => {
  return BB.all([]).then(() => CustomerService.getProfile({ client: req.client }));
});

exports.patchProfile = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    CustomerService.patchProfile({
      client: req.client,
      data: req.body,
    })
  );
});

exports.freezeProfile = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    CustomerService.freezeProfile({
      client: req.client,
      data: req.body,
    })
  );
});

exports.getAllCustomersController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.getAll(Customer)(req));
});

exports.getOneCustomerController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.getOne(Customer)(req));
});

exports.updateOneCustomerController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.updateOne(Customer)(req));
});

exports.deleteOneCustomerController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => factory.deleteOne(Customer)(req));
});

exports.productSearchAddDB = async (req, res, next) => {
  let tokenCode;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    tokenCode = req.headers.authorization.split(" ")[1];
  } else {
    return next();
  }

  let tokenWithClient = await ClientTokenDataAccess.getClientTokenDB(tokenCode);

  if (isNullOrEmpty(tokenWithClient)) {
    return res.status(401).json({ returnMessage: "Unauthorized access", returnCode: "401" });
  }

  let customer = tokenWithClient.client;
  if (isNullOrEmpty(customer)) {
    req.custom.respObj = new AppError(Messages.RETURN_MESSAGES.ERR_NO_CLIENT_ASSOCIATED_WITH_TOKEN);
    return res.status(401).json({ returnMessage: "Unauthorized access", returnCode: "401" });
  }

  searchObj = { tags: req.custom.tags, createdAt: Date.now() };
  await CustomerDataAccess.pushSearchEntryToDB(customer._id, searchObj);
  next();
};

exports.getProductRecommendationController = BaseUtil.createController((req) => {
  return BB.all([]).then(() =>
    CustomerService.getProductRecommendationService({
      customer: req.client,
    })
  );
});
