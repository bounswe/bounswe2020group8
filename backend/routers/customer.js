const CustomerController = require("../controllers/customer");
const RequestHelper = require("./../util/requestHelper");

const rootPath = "/customer/";

module.exports = function (server) {
  server.post(`${rootPath}me`, CustomerController.getProfile, RequestHelper.returnResponse);
  server.patch(`${rootPath}me`, CustomerController.patchProfile, RequestHelper.returnResponse);
  server.delete(`${rootPath}me`, CustomerController.deleteUser, RequestHelper.returnResponse);
  server.post(
    `${rootPath}signup`,
    CustomerController.signupController,
    RequestHelper.returnResponse
  );
  server.post(
    `${rootPath}signupWithGoogle`,
    CustomerController.signupWithGoogleController,
    RequestHelper.returnResponse
  );
  server.post(
    `${rootPath}loginWithGoogle`,
    CustomerController.loginWithGoogleController,
    RequestHelper.returnResponse
  );
};
