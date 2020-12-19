const validator = require("validator");
const BB = require("bluebird");
const CoreUtil = require("./coreUtil");
const AppError = require("./appError");
const Messages = require("../util/messages");

exports.validator = validator;

exports.validatePassword = function (param, errObj) {
  return new BB((resolve, reject) => {
    if (typeof param === "string" && param.length >= 4) {
      resolve();
    } else {
      reject(new AppError(errObj));
    }
  });
};

exports.validatePasswords = function (newPassword, newPasswordCheck, errObj) {
  return new BB((resolve, reject) => {
    if (newPassword === newPasswordCheck) {
      resolve();
    } else {
      reject(new AppError(errObj));
    }
  });
};

exports.validateNonNegativeNumber = function (param, errObj) {
  return new BB((resolve, reject) => {
    if (CoreUtil.isNull(param) || Number.isNaN(param) || param < 0) {
      reject(new AppError(errObj));
    } else {
      resolve();
    }
  });
};

exports.validateBoolean = function (param, errObj) {
  return new BB((resolve, reject) => {
    if (typeof param === "boolean") {
      resolve();
    } else {
      reject(new AppError(errObj));
    }
  });
};

exports.validateIfNotNull = function (param, errObj) {
  return new BB((resolve, reject) => {
    if (CoreUtil.isNull(param)) {
      reject(new AppError(errObj));
    } else {
      resolve();
    }
  });
};

exports.validateIfArrayOfIds = function (param, errObj) {
  return new BB((resolve, reject) => {
    if (Array.isArray(param)) {
      for (let key in param) {
        if (
          typeof param[key] != "function" &&
          (typeof param[key] != "string" || !validator.isMongoId(param[key]))
        ) {
          return reject(new AppError(errObj));
        }
      }
      return resolve();
    }
    reject(new AppError(errObj));
  });
};

exports.validateIfArray = function (array, errObj) {
  return new BB((resolve, reject) => {
    if (Array.isArray(array)) {
      return resolve();
    }
    reject(new AppError(errObj));
  });
};

exports.validateClient = function (client, allowBanned) {
  return new BB((resolve, reject) => {
    if (!CoreUtil.isNull(client) && (!client.isBanned || allowBanned)) {
      resolve();
    } else if (CoreUtil.isNull(client)) {
      reject(new AppError(Messages.RETURN_MESSAGES.ERR_INSUFFICIENT_TOKEN));
    } else if (client.isClosed) {
      reject(new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_ACCOUNT_BANNED));
    } else {
      reject(new AppError(Messages.RETURN_MESSAGES.ERR_INSUFFICIENT_TOKEN));
    }
  });
};

exports.validateIfString = function (isStrValue, errObj) {
  return new BB((resolve, reject) => {
    if (CoreUtil.isNullOrEmpty(isStrValue) || typeof isStrValue !== "string") {
      reject(new AppError(errObj));
    } else {
      resolve();
    }
  });
};

exports.validateIfValEqual = function (val1, val2, errObj) {
  return new BB((resolve, reject) => {
    if (val1 != val2) {
      reject(new AppError(errObj));
    } else {
      resolve();
    }
  });
};

exports.validateIfNullOrEmpty = function (value, errObj) {
  return new BB((resolve, reject) => {
    if (CoreUtil.isNullOrEmpty(value)) {
      reject(new AppError(errObj));
    } else {
      resolve();
    }
  });
};

exports.validateEnum = function (value, enums, errObj) {
  return new BB((resolve, reject) => {
    if (CoreUtil.isNullOrEmpty(value) || enums.indexOf(value) === -1) {
      reject(new AppError(errObj));
    } else {
      resolve();
    }
  });
};

exports.validateDate = function (date, errObj) {
  return new BB((resolve, reject) => {
    if (new Date(date) !== "Invalid Date" && !Number.isNaN(new Date(date).getTime())) {
      resolve();
    } else {
      reject(new AppError(errObj));
    }
  });
};

exports.validateMongoId = function (id, errObj) {
  return new BB((resolve, reject) => {
    if (typeof id != "string" || !validator.isMongoId(id)) {
      reject(new AppError(errObj));
    } else {
      resolve();
    }
  });
};

exports.isNumeric = function (value, errObj) {
  return new BB((resolve, reject) => {
    if (Number.isNaN(value)) {
      reject(new AppError(errObj));
    } else {
      resolve();
    }
  });
};

exports.isNumericOrFloat = function (value, errObj) {
  return new BB((resolve, reject) => {
    if (!(validator.isNumeric(value) || validator.isFloat(value))) {
      reject(new AppError(errObj));
    } else {
      resolve();
    }
  });
};

exports.validateEmail = function (email) {
  return new BB((resolve, reject) => {
    if (typeof email != "string" || !validator.isEmail(email)) {
      reject(new AppError(Messages.RETURN_MESSAGES.ERR_EMAIL_IS_INVALID));
    } else {
      resolve();
    }
  });
};

exports.isValidSHA1Hash = function (str, errorMessage) {
  return new BB((resolve, reject) => {
    if (!CoreUtil.isNullOrEmpty(str) && /^[a-z0-9]+$/i.test(str) && str.length === 40) {
      resolve();
    } else {
      reject(new AppError(errorMessage || Messages.RETURN_MESSAGES.ERR_INVALID_HASH));
    }
  });
};
