const VendorService = require("../services/vendor");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const Constants = require("./../util/constants");

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
      })
    );
});
