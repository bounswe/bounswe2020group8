const VendorController = require("../controllers/vendor");
const RequestHelper = require("./../util/requestHelper");

const rootPath = "/vendor";

module.exports = function (server) {
  server.post(
    `${rootPath}/signup`,
    VendorController.signupController,
    RequestHelper.returnResponse
  );

  server.get(`${rootPath}`, VendorController.getAllVendorsController, RequestHelper.returnResponse);

  server.get(
    `${rootPath}/:id`,
    VendorController.getOneVendorController,
    RequestHelper.returnResponse
  );
  server.patch(
    `${rootPath}/:id`,
    VendorController.updateOneVendorController,
    RequestHelper.returnResponse
  );
  server.delete(
    `${rootPath}/:id`,
    VendorController.deleteOneVendorController,
    RequestHelper.returnResponse
  );
};
