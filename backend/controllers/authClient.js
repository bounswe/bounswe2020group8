const ClientService = require("../services/authClient");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const Constants = require("./../util/constants");

exports.loginController = BaseUtil.createController((req) => {
  let { email, password } = req.query;
  let __type = req.params.clientType.charAt(0).toUpperCase() + req.params.clientType.slice(1);

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
  let { newPassword, newPasswordRepeat } = req.query;
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
        newPassword,
        newPasswordRepeat,
      })
    );
});

exports.forgotPasswordController = BaseUtil.createController((req) => {
  let { email } = req.query;
  let __type = req.params.clientType.charAt(0).toUpperCase() + req.params.clientType.slice(1);
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

exports.loginWithGoogleController = BaseUtil.createController((req) => {
  let { email, googleID } = req.query;
  let __type = req.params.clientType.charAt(0).toUpperCase() + req.params.clientType.slice(1);

  email = typeof email == "string" ? email.toLowerCase() : ""; // if it is not valid, validateEmail will reject it
  return BB.all([
    AppValidator.validateEmail(email, Messages.RETURN_MESSAGES.ERR_EMAIL_IS_INVALID).reflect(),
    AppValidator.validateEnum(
      __type,
      Object.values(Constants.ENUMS.CLIENT_TYPE),
      Messages.RETURN_MESSAGES.ERR_CLIENT_TYPE_IS_INVALID
    ).reflect(),
    AppValidator.validateIfString(googleID, Messages.RETURN_MESSAGES.ERR_INVALID_GOOGLE_ID),
  ])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      ClientService.loginWithGoogleService({
        email,
        __type,
        googleID,
      })
    );
});
