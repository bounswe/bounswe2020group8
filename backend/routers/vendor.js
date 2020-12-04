const VendorController = require("../controllers/vendor");
const RequestHelper = require("./../util/requestHelper");

const rootPath = "/vendor/";

module.exports = function (server) {
  server.post(`${rootPath}me`, VendorController.getProfile, RequestHelper.returnResponse);
  server.patch(`${rootPath}me`, VendorController.patchProfile, RequestHelper.returnResponse);
  server.delete(`${rootPath}me`, VendorController.deleteUser, RequestHelper.returnResponse);
  server.post(`${rootPath}signup`, VendorController.signupController, RequestHelper.returnResponse);
};
