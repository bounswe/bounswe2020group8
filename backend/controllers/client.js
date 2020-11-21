const ClientService = require("../services/client");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const Constants = require("./../util/constants");

exports.initController = BaseUtil.createController(req => {
  let token = req.custom.tokenObject;
  const language = req.custom.language;
  return BB.all([])
    .then(results => BaseUtil.decideErrorExist(results))
    .then(() => ClientService.initService({ token, language }));
});

exports.loginController = BaseUtil.createController(req => {
  let { email, password, type } = req.query;
  email = typeof email == "string" ? email.toLowerCase() : ""; // if it is not valid, validateEmail will reject it
  return BB.all([
    AppValidator.validatePassword(
      password,
      Messages.RETURN_MESSAGES.ERR_INVALID_PASSWORD
    ).reflect(),
    AppValidator.validateEmail(
      email,
      Messages.RETURN_MESSAGES.ERR_EMAIL_IS_INVALID
    ).reflect(),
    AppValidator.validateEnum(
      type,
      Object.values(Constants.ENUMS.CLIENT_TYPE),
      Messages.RETURN_MESSAGES.ERR_CLIENT_TYPE_IS_INVALID
    ).reflect()
  ])
    .then(results => BaseUtil.decideErrorExist(results))
    .then(() =>
      ClientService.loginService({
        email,
        password,
        type
      })
    );
});


exports.signupController = BaseUtil.createController(req => {
  let { email, password, passwordConfirm, type, name, lastName } = req.query;
  email = typeof email == "string" ? email.toLowerCase() : ""; // if it is not valid, validateEmail will reject it
  return BB.all([
    AppValidator.validatePassword(
      password,
      Messages.RETURN_MESSAGES.ERR_INVALID_PASSWORD
    ).reflect(),
    AppValidator.validateEmail(
      email,
      Messages.RETURN_MESSAGES.ERR_EMAIL_IS_INVALID
    ).reflect(),  
    AppValidator.validateEnum(
      type,
      Object.values(Constants.ENUMS.CLIENT_TYPE),
      Messages.RETURN_MESSAGES.ERR_CLIENT_TYPE_IS_INVALID
    ).reflect(),
    AppValidator.validatePasswords(
      password,
      passwordConfirm,
      Messages.RETURN_MESSAGES.ERR_PASSWORDS_DO_NOT_MATCH
    ).reflect(),
    AppValidator.validateIfString(
      name,
      Messages.RETURN_MESSAGES.ERR_NAME_EMPTY
    ),
    AppValidator.validateIfString(
      lastName,
      Messages.RETURN_MESSAGES.ERR_LAST_NAME_EMPTY
    )
  ])
    .then(results => BaseUtil.decideErrorExist(results))
    .then(() =>
      ClientService.signupService({
        email,
        password,
        type,
        name,
        lastName
      })
    );
});

exports.verifyEmailController = BaseUtil.createController(req => {
  let { verifyEmailToken } = req.query;
  return BB.all([
    AppValidator.validateIfNotNull(
      verifyEmailToken,
      Messages.RETURN_MESSAGES.ERR_INSUFFICIENT_TOKEN
    ).reflect(),
  ])
    .then(results => BaseUtil.decideErrorExist(results))
    .then(() =>
      ClientService.verifyEmailService({
        verifyEmailToken
      })
    );
});

exports.changePasswordController = BaseUtil.createController(req => {
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
    ).reflect()
  ])
    .then(results => BaseUtil.decideErrorExist(results))
    .then(() =>
      ClientService.changePasswordService({
        token,
        newPassword,
        newPasswordRepeat
      })
    );
});
