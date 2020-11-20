const ClientDataAccess = require("../dataAccess/client");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const Constants = require("../util/constants");
const AppValidator = require("./appValidator");
const Messages = require("../util/messages");
const AppError = require("./appError");
const { isNull, isNullOrEmpty, deepDeleteFields } = require("../util/coreUtil");
const _ = require("underscore");

function getLanguageFromReq(req) {
  let language;
  try {
    if (!isNull(req.query.language)) {
      if (Object.values(Constants.LANGUAGE).indexOf(req.query.language) == -1) {
        throw new Error();
      }
    } else {
      language = req.custom.tokenObject.language;
      if (isNull(language)) {
        throw new Error();
      }
    }
  } catch (err) {
    language = Constants.LANGUAGE.EN;
  }
  return language;
}

function isErrorResponse(respObj) {
  return (
    respObj instanceof AppError ||
    respObj instanceof Error ||
    (respObj instanceof Array &&
      (respObj[0] instanceof AppError || respObj[0] instanceof Error))
  );
}

function checkTokenCode(req) {
  const tokenCode = req.query.tokenCode;
  if (
    !(
      isNullOrEmpty(tokenCode) ||
      (typeof tokenCode === "string" &&
        AppValidator.validator.isAlphanumeric(tokenCode))
    )
  ) {
    console.log("InjectionTokenCodeError", req.url, JSON.stringify(req.query));
    return false;
  }
  return true;
}

function checkJSON(obj) {
  _.each(obj, (v, k) => {
    if (_.isObject(v)) {
      checkJSON(v);
    } else if (_.isNumber(k)) {
    } else if (k.match(/^\$/)) {
      console.log("InjectionJSONError", "keyValue", k, ":", v);
      throw new AppError(Messages.RETURN_MESSAGES.ERR_UNDEFINED);
    }
  });
  return obj;
}

exports.logParams = function(req, res, next) {
  const logObj = {
    url: req.url,
    request: req.query
  };
  if (req.custom && req.custom.tokenObject && req.custom.tokenObject.client) {
    logObj.identifier =
      req.custom.tokenObject.client._id || req.custom.tokenObject.client;
  }
  console.log("logParams", JSON.stringify(logObj));
  next();
};

const clientEndpointsWithoutToken = ["login", "forgotPassword", "resetPassword", "signup", "verifyEmail"];

exports.getToken = async function(req, res, next) {
  const logObj = {
    url: req.url,
    request: req.query
  };
  console.log("getToken", JSON.stringify(logObj));
  try {
    checkJSON(req.query);
  } catch (err) {
    console.log("InjectionBodyError", req.url, JSON.stringify(req.query));
    res.send(401, "Unauthorized");
    return;
  }
  req.custom = {};
  req.custom.language = "en";
  req.custom.requestDate = Date.now();
  if (req.url.indexOf("/client/") != -1) {
    if (!checkTokenCode(req)) {
      res.send(401, "Unauthorized");
      return;
    }
    let requiresClientToken = true;
    clientEndpointsWithoutToken.forEach(e => {
      if (req.url.indexOf(e) != -1) {
        requiresClientToken = false;
      }
    });
    if (requiresClientToken) {
      const tokenWithClient = await ClientTokenDataAccess.getClientTokenDB(
        req.query.tokenCode
      );
      if (!isNull(tokenWithClient) && !isNull(tokenWithClient.client)) {
        req.custom.tokenObject = tokenWithClient;
        next();
      } else {
        return res.status(401).send({
          returnCode: Messages.RETURN_MESSAGES.ERR_INSUFFICIENT_TOKEN.code,
          returnMessage:
            Messages.RETURN_MESSAGES.ERR_INSUFFICIENT_TOKEN.messages.en
        });
      }
    } else {
      next();
    }
  } else {
    // we will have admin endpoints here, we will get admintoken
    res.send(401, "Unauthorized");
    return;
  }
};

exports.returnResponse = async function(req, res, next) {
  const language = req.custom.language;
  try {
    deepDeleteFields(req.query, [
      "password",
      "newPassword",
      "hashedPassword",
      "hashedNewPassword"
    ]);
  } catch (err) {
    console.log("delete password field failed", err);
  }
  let { respObj } = req.custom;
  let isError = isErrorResponse(respObj);
  if (isError) {
    respObj = exports.getErrorMessageAndCode(respObj, language);
  } else {
    respObj.returnCode = 0;
    respObj.returnMessage = respObj.returnMessage || "Success";
  }
  const logObj = {
    url: req.url,
    request: req.query,
    response: respObj
  };
  console.log("returnResponse", JSON.stringify(logObj));
  if (req.isExtendTimeoutDuration === true) {
    res.write(JSON.stringify(respObj));
    res.end();
  } else {
    if (isError) {
      res.status(400).send(respObj);
    } else {
      res.send(respObj);
    }
  }
  next();
};

exports.getErrorMessageAndCode = function(err, language) {
  if (isNull(err)) {
    err = new Error(Messages.RETURN_MESSAGES.ERR_UNDEFINED);
  }
  let returnMsg = {};
  const keyCode = Constants.RESPONSE.CODE;
  const keyMessage = Constants.RESPONSE.MESSAGE;
  const keyTitle = Constants.RESPONSE.TITLE;
  const iconName = Constants.RESPONSE.ICON;
  returnMsg[keyMessage] = "";
  if (Array.isArray(err)) {
    returnMsg[keyCode] = Messages.RETURN_MESSAGES.ERR_VALIDATION_ERROR.code;
    err.forEach(errItem => {
      returnMsg[keyMessage] += `${errItem.returnObjects.messages[language]}\n`;
    });
    return returnMsg;
  }
  if (err instanceof AppError) {
    console.log("getErrorMessageAndCode", "AppError");
    returnMsg = {
      [keyCode]: err.code,
      [keyMessage]: err.returnObjects.messages[language]
    };
    if (err.returnObjects.titles) {
      returnMsg[keyTitle] = err.returnObjects.titles[language];
    }
    if (err.returnObjects.iconName) {
      returnMsg[iconName] = err.returnObjects.iconName;
    }
    return returnMsg;
  }
  const errorObj = JSON.parse(
    JSON.stringify(err, ["arguments", "type", "name", "stack"])
  );
  console.log("errorObj", JSON.stringify(errorObj));
  returnMsg = {
    [keyCode]: Messages.RETURN_MESSAGES.ERR_UNDEFINED.code,
    [keyTitle]: Messages.RETURN_MESSAGES.ERR_UNDEFINED.titles[language],
    [keyMessage]: Messages.RETURN_MESSAGES.ERR_UNDEFINED.messages[language]
  };
  return returnMsg;
};
