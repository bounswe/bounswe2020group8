const express = require("express");
const MainProductController = require("../controllers/mainProduct");
const RequestHelper = require("./../util/requestHelper");

const router = express.Router();

router
  .route("/")
  .get(MainProductController.getAllMainProducts, RequestHelper.returnResponse)
  .post(MainProductController.createMainProduct, RequestHelper.returnResponse);

router
  .route("/:id")
  .get(MainProductController.getOneMainProductController, RequestHelper.returnResponse)
  .patch(MainProductController.updateOneMainProductController, RequestHelper.returnResponse)
  .delete(MainProductController.deleteOneMainProductController, RequestHelper.returnResponse);

router.delete(
  "/:mpid/vendor/:vid",
  MainProductController.deleteVendorFromMainProductController,
  RequestHelper.returnResponse
);

module.exports = router;
