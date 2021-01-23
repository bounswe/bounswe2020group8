const mongoose = require("mongoose");

const ActivityDataAccess = require("../dataAccess/activity");
const Constants = require("../util/constants");

exports.registerActivity = async (req, res, next) => {
  const re = new RegExp(/^[A-Za-z]+$/);
  let url = req.originalUrl;
  let url_tokens = req.originalUrl.split("/");
  let method = req.method;
  let objective = new Array();
  objective.push(method.toUpperCase());
  for (let i = 0; i < url_tokens.length; i++) {
    let token = url_tokens[i];
    if (token == "") {
      continue;
    }
    if (re.test(token) == true) {
      objective.push(token.toUpperCase());
    } else {
      objective.push("ID");
    }
  }
  let type = objective.join("_");
  let object = {
    _id: Constants.EVENT_IDS[type],
    type,
    url,
    name: Constants.OBJECTIVES[type],
  };

  let client = req.client;
  let actor_name = "";
  let actor_url = "";
  if (client.hasOwnProperty("companyName") == true) {
    actor_name = client.companyName + " " + client.companyDomainName;
    actor_url = "/vendor";
  } else {
    actor_name = client.name + " " + client.lastName;
    actor_url = "/customer";
  }

  let actor = {
    _id: mongoose.Types.ObjectId(client._id),
    type: client.__type,
    name: actor_name,
    url: actor_url,
  };

  let summary = actor.name + " " + actor.url + " " + object.name + " " + object._id;
  const newActivity = {
    summary,
    actor,
    object,
  };
  await ActivityDataAccess.createActivityDB(newActivity);
  next();
};
