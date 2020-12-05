const CustomerController = require("../controllers/customer");
const RequestHelper = require("./../util/requestHelper");

const rootPath = "/customer";

module.exports = function (server) {
  server.post(
    `${rootPath}/signup`,
    CustomerController.signupController,
    RequestHelper.returnResponse
  );
  server.post(
    `${rootPath}/signupWithGoogle`,
    CustomerController.signupWithGoogleController,
    RequestHelper.returnResponse
  );
  server.post(
    `${rootPath}/loginWithGoogle`,
    CustomerController.loginWithGoogleController,
    RequestHelper.returnResponse
  );

  server.get(
    `${rootPath}`,
    CustomerController.getAllCustomersController,
    RequestHelper.returnResponse
  );

  server.get(
    `${rootPath}/:id`,
    CustomerController.getOneCustomerController,
    RequestHelper.returnResponse
  );
  server.patch(
    `${rootPath}/:id`,
    CustomerController.updateOneCustomerController,
    RequestHelper.returnResponse
  );
  server.delete(
    `${rootPath}/:id`,
    CustomerController.deleteOneCustomerController,
    RequestHelper.returnResponse
  );
};
