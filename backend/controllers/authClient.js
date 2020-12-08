const ClientService = require("../services/authClient");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const Constants = require("./../util/constants");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const { isNull } = require("underscore");
const { isNullOrEmpty } = require("../util/coreUtil");
const AppError = require("../util/appError");

exports.loginController = BaseUtil.createController((req) => {
  let { email, password } = req.query;
  const type = req.originalUrl.split("/")[1];
  let __type = type.firstCharUpperCase();

  email = typeof email == "string" ? email.toLowerCase() : ""; // if it is not valid, validateEmail will reject it
  return BB.all([
    AppValidator.validatePassword(
      password,
      Messages.RETURN_MESSAGES.ERR_INVALID_PASSWORD
    ).reflect(),
    AppValidator.validateEnum(
      __type,
      Object.values(Constants.ENUMS.CLIENT_TYPE),
      Messages.RETURN_MESSAGES.ERR_CLIENT_TYPE_IS_INVALID
    ).reflect(),
    AppValidator.validateEmail(email, Messages.RETURN_MESSAGES.ERR_EMAIL_IS_INVALID).reflect(),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      ClientService.loginService({
        email,
        password,
        __type,
      })
    );
});

exports.verifyEmailController = BaseUtil.createController((req) => {
  let { verifyEmailToken } = req.query;
  return BB.all([
    AppValidator.validateIfNotNull(
      verifyEmailToken,
      Messages.RETURN_MESSAGES.ERR_INSUFFICIENT_TOKEN
    ).reflect(),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      ClientService.verifyEmailService({
        verifyEmailToken,
      })
    );
});

exports.changePasswordController = BaseUtil.createController((req) => {
  let token = req.custom.tokenObject;
  let client = req.custom.tokenObject.client;
  let { oldPassword, newPassword, newPasswordRepeat } = req.query;
  return BB.all([
    AppValidator.validateClient(client, false).reflect(),
    AppValidator.validatePassword(
      newPassword,
      Messages.RETURN_MESSAGES.ERR_INVALID_PASSWORD
    ).reflect(),
    AppValidator.validatePassword(
      newPasswordRepeat,
      Messages.RETURN_MESSAGES.ERR_INVALID_PASSWORD
    ).reflect(),
    AppValidator.validatePasswords(
      newPassword,
      newPasswordRepeat,
      Messages.RETURN_MESSAGES.ERR_NEW_PASSWORD_IS_INVALID
    ).reflect(),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      ClientService.changePasswordService({
        token,
        oldPassword,
        newPassword,
      })
    );
});

exports.forgotPasswordController = BaseUtil.createController((req) => {
  let { email } = req.query;
  const type = req.originalUrl.split("/")[1];
  let __type = type.firstCharUpperCase();

  email = typeof email == "string" ? email.toLowerCase() : "";
  return BB.all([
    AppValidator.validateEmail(email, Messages.RETURN_MESSAGES.ERR_EMAIL_IS_INVALID).reflect(),
    AppValidator.validateEnum(
      __type,
      Object.values(Constants.ENUMS.CLIENT_TYPE),
      Messages.RETURN_MESSAGES.ERR_CLIENT_TYPE_IS_INVALID
    ).reflect(),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      ClientService.forgotPasswordService({
        email,
        __type,
      })
    );
});

exports.resetPasswordController = BaseUtil.createController((req) => {
  let { resetPasswordToken, newPassword, newPasswordCheck } = req.query;
  return BB.all([
    AppValidator.validateIfNotNull(
      resetPasswordToken,
      Messages.RETURN_MESSAGES.ERR_INSUFFICIENT_TOKEN
    ).reflect(),
    AppValidator.validatePassword(
      newPassword,
      Messages.RETURN_MESSAGES.ERR_INVALID_PASSWORD
    ).reflect(),
    AppValidator.validatePasswords(
      newPassword,
      newPasswordCheck,
      Messages.RETURN_MESSAGES.ERR_PASSWORDS_DO_NOT_MATCH
    ).reflect(),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      ClientService.resetPasswordService({
        resetPasswordToken,
        newPassword,
      })
    );
});

exports.protectRoute = async (req, res, next) => {
  let tokenCode;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    tokenCode = req.headers.authorization.split(" ")[1];
  }

  let tokenWithClient = await ClientTokenDataAccess.getClientTokenDB(tokenCode);

  if (isNullOrEmpty(tokenWithClient)) {
    req.custom.respObj = new AppError(Messages.RETURN_MESSAGES.ERR_VALIDATION_ERROR);
    return res.status(401).json({ returnMessage: "Unauthorized access", returnCode: "401" });
  }

  let client = tokenWithClient.client;
  if (isNullOrEmpty(client)) {
    req.custom.respObj = new AppError(Messages.RETURN_MESSAGES.ERR_NO_CLIENT_ASSOCIATED_WITH_TOKEN);
    return res.status(401).json({ returnMessage: "Unauthorized access", returnCode: "401" });
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.client = client;
  next();
};
