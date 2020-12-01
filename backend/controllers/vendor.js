const VendorService = require("../services/vendor");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const Constants = require("./../util/constants");

// #TODO BIRTHDAY EKLEMELI MIYIM?
exports.signupController = BaseUtil.createController((req) => {
  let { email, password, passwordConfirm, name, lastName, telephoneNumber, birthday } = req.query;
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
      VendorService.signupService({
        email,
        password,
        name,
        lastName,
        telephoneNumber,
        birthday,
      })
    );
});

// exports.signupWithGoogleController = BaseUtil.createController((req) => {
//   let { email, googleID } = req.query;
//   email = typeof email == "string" ? email.toLowerCase() : ""; // if it is not valid, validateEmail will reject it
//   return BB.all([
//     AppValidator.validateEmail(email, Messages.RETURN_MESSAGES.ERR_EMAIL_IS_INVALID).reflect(),
//     AppValidator.validateIfString(googleID, Messages.RETURN_MESSAGES.ERR_INVALID_GOOGLE_ID),
//   ])
//     .then((results) => BaseUtil.decideErrorExist(results))
//     .then(() =>
//       ClientService.signupWithGoogleService({
//         email,
//         googleID,
//       })
//     );
// });
