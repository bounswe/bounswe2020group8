/* eslint-disable no-unused-vars */
const mongooseConfig = require("./mongoose_config");
const Config = require("./config");
const Constants = require("./util/constants");
const Messages = require("./util/messages");
const BaseUtil = require("./util/baseUtil");
const CoreUtil = require("./util/coreUtil");
const RequestHelper = require("./util/requestHelper");
const BB = require("bluebird");
const _ = require("lodash");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

BB.longStackTraces();
mongooseConfig.connect(Config);
const http = require("http");

let swaggerDocument = require("./swagger.json");
swaggerDocument.host = `${Config.hostAddr}:${Config.port}`;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(RequestHelper.getToken);
app.use(RequestHelper.logParams);
//

app.on("uncaughtException", (req, res, route, err) => {
  console.log("uncaughtException", Config.dyno, err.stack);
  // this is for recursively call uncaughtException
  if (err.message == "write after end") {
    return;
  }
  const language = req.custom.language;
  req.custom.respObj = {
    returnCode: Messages.RETURN_MESSAGES.ERR_UNDEFINED.code,
    returnMessage: Messages.RETURN_MESSAGES.ERR_UNDEFINED.messages[language],
  };
  try {
    RequestHelper.returnResponse(req, res, () => {});
  } catch (error) {
    console.log("uncaughtExceptionResSendErr", error);
  }
});
process.on("SIGTERM", () => {
  console.log(Config.dyno, "------------RECEIVED SIGTERM----------");
  app.close(() => {
    console.log(Config.dyno, "------------HTTP SERVER CLOSED----------");
    process.exit(0);
  });
});
let blocked = require("blocked");
require("./routers/client")(app);

blocked((ms) => {
  if (ms > 3000) {
    console.log("EventLoopBlocked", ms, Config.dyno, global.REQUEST_ID);
  }
});
const port = Config.port;
app.listen(port, () => {
  const env = Config.env || Constants.NODE_ENV;
  console.log("%s is listening on %s", app.name, port, new Date());
  console.log("node environment is: ", env);
  console.log("dyno is: ", Config.dyno);
});

app.get("/", (req, res) => {
  res.send(200, "Server is running");
});
