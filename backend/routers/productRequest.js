const express = require("express");
const ProductRequestController = require("../controllers/productRequest");
const RequestHelper = require("./../util/requestHelper");

const router = express.Router();

router
  .route("/")
  .get(ProductRequestController.getAllProductRequestsController, RequestHelper.returnResponse);

router
  .route("/:id")
  .get(ProductRequestController.getOneProductRequestController, RequestHelper.returnResponse)
  .patch(ProductRequestController.updateOneProductRequestController, RequestHelper.returnResponse)
  .delete(ProductRequestController.deleteOneProductRequestController, RequestHelper.returnResponse);

module.exports = router;
