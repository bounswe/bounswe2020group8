const CustomerController = require("../controllers/customer");
const RequestHelper = require("./../util/requestHelper");

const rootPath = "/customer/";

module.exports = function (server) {
  server.post(
    `${rootPath}signup`,
    CustomerController.signupController,
    RequestHelper.returnResponse
  );
  // server.post(
  //   `${rootPath}signupWithGoogle`,
  //   CustomerController.signupWithGoogleController,
  //   RequestHelper.returnResponse
  // );
};
