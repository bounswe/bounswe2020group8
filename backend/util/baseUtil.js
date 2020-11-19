const Constants = require("../util/constants");
const { isNull } = require("../util/coreUtil");
const Config = require("../config");
const BB = require("bluebird");
const crypto = require("crypto");
const Request = require("request");

// const xml2js = require('xml2js');
exports.makeRandomString = function (lengthOfString, typeOfRandomString) {
  if (isNull(typeOfRandomString)) {
    typeOfRandomString = Constants.RANDOM_PASSWORD_TYPE.ALPHANUMERIC;
  }
  let text = "";
  for (let i = 0; i < lengthOfString; i++) {
    text += typeOfRandomString.chars.charAt(
      Math.floor(Math.random() * typeOfRandomString.chars.length)
    );
  }
  return text;
};

exports.sha1 = function (data) {
  return crypto.createHash("sha1").update(data.toString()).digest("hex");
};

exports.sha256 = function (data) {
  return crypto.createHash("sha256").update(data.toString()).digest("hex");
};

exports.decideErrorExist = function (results) {
  return new BB((resolve, reject) => {
    if (isNull(results)) {
      return resolve();
    }
    const errors = [];
    for (let i = 0; i < results.length; i++) {
      if (!isNull(results[i]) && results[i].isRejected()) {
        errors.push(results[i].reason());
      }
    }
    if (errors.length > 0) {
      return reject(errors[0]);
    }
    return resolve();
  });
};

exports.consoleLogError = function (err) {
  let shouldLogErrorStack = false;
  if (
    (!isNull(Config.logErrorStack) && Config.logErrorStack == "true") ||
    Config.env !== "prod"
  ) {
    shouldLogErrorStack = true;
  }
  if (shouldLogErrorStack) {
    console.log(err);
    console.log(err.stack);
  } else {
    console.log(JSON.stringify(err));
  }
};

exports.sendRequest = function (options) {
  return new BB((resolve) => {
    Request(options, (error, response, body) => {
      resolve({ error, response, body });
    });
  });
};

exports.asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
};

/**
 * Creating a controller that removes boilerplate code.
 * Without the dependency injection.
 * @param logicFunction
 * @returns {Function}
 */
exports.createController = function (logicFunction) {
  return function (req, res, next) {
    try {
      logicFunction(req)
        .then((respObj) => {
          req.custom.respObj = respObj;
        })
        .catch((err) => {
          req.custom.respObj = err;
        })
        .done(() => next());
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};
