const ClientController = require("../controllers/authClient");
const RequestHelper = require("./../util/requestHelper");

const rootPath = "/:clientType";

module.exports = function (server) {
  server.post(`${rootPath}login`, ClientController.loginController, RequestHelper.returnResponse);
  server.get(
    `${rootPath}/verifyEmail`,
    ClientController.verifyEmailController,
    RequestHelper.returnResponse
  );
  server.post(
    `${rootPath}/changePassword`,
    ClientController.changePasswordController,
    RequestHelper.returnResponse
  );
  server.post(
    `${rootPath}/forgotPassword`,
    ClientController.forgotPasswordController,
    RequestHelper.returnResponse
  );
  server.post(
    `${rootPath}/resetPassword`,
    ClientController.resetPasswordController,
    RequestHelper.returnResponse
  );
};
