/* eslint-disable no-unused-vars */
const mongooseConfig = require("./mongoose_config");
const Config = require("./config");
const Constants = require("./util/constants");
const Messages = require("./util/messages");
const RequestHelper = require("./util/requestHelper");
const BB = require("bluebird");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const clientRouter = require("./routers/client");
const customerRouter = require("./routers/customer");
const vendorRouter = require("./routers/vendor");
const adminRouter = require("./routers/admin");
const categoryRouter = require("./routers/category");
const ratingRouter = require("./routers/rating");
const mainProductRouter = require("./routers/mainProduct");
const productRouter = require("./routers/product");
const productRequestRouter = require("./routers/productRequest");
const commentRouter = require("./routers/comment");
const shoppingListRouter = require("./routers/list");

BB.longStackTraces();
mongooseConfig.connect(Config);

const YAML = require("yamljs");
const swaggerDocument = YAML.load("./documentation/swagger.yaml");

swaggerDocument.host = `${Config.hostAddr}:${Config.port}`;

app.use(cors());
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

app.use("/:clientType", clientRouter);
app.use("/customer", customerRouter);
app.use("/vendor", vendorRouter);
app.use("/admin", adminRouter);
app.use("/category", categoryRouter);
app.use("/rating", ratingRouter);
app.use("/mainProduct", mainProductRouter);
app.use("/product", productRouter);
app.use("/productRequest", productRequestRouter);
app.use("/comment", commentRouter);
app.use("/shoppingList", shoppingListRouter);

blocked((ms) => {
  if (ms > 3000) {
    console.log("EventLoopBlocked", ms, Config.dyno, global.REQUEST_ID);
  }
});

const port = Config.port;
const httpServer = http.createServer(app);
httpServer.listen(port, () => {
  const env = Config.env || Constants.NODE_ENV;
  console.log("%s is listening on %s", app.name, port, new Date());
  console.log("node environment is: ", env);
  console.log("dyno is: ", Config.dyno);
});
