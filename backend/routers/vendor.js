const VendorController = require("../controllers/vendor");
const RequestHelper = require("./../util/requestHelper");

const rootPath = "/vendor/";

module.exports = function (server) {
  server.post(`${rootPath}signup`, VendorController.signupController, RequestHelper.returnResponse);
};
