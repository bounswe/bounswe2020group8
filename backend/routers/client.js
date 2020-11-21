const ClientController = require("../controllers/client");
const RequestHelper = require("./../util/requestHelper");

const rootPath = "/client/";

module.exports = function(server) {
  server.post(
    `${rootPath}init`,
    ClientController.initController,
    RequestHelper.returnResponse
  );
  server.post(
    `${rootPath}login`,
    ClientController.loginController,
    RequestHelper.returnResponse
  );
  server.post(
    `${rootPath}signup`,
    ClientController.signupController,
    RequestHelper.returnResponse
  );
  server.post(
    `${rootPath}verifyEmail`,
    ClientController.verifyEmailController,
    RequestHelper.returnResponse
  );
  server.post(
    `${rootPath}changePassword`,
    ClientController.changePasswordController,
    RequestHelper.returnResponse
  );
  server.post(
    `${rootPath}forgotPassword`,
    ClientController.forgotPasswordController,
    RequestHelper.returnResponse
  );
  server.post(
    `${rootPath}resetPassword`,
    ClientController.resetPasswordController,
    RequestHelper.returnResponse
  );
};
