const express = require("express");
const ProductController = require("../controllers/product");
const RequestHelper = require("./../util/requestHelper");

const router = express.Router();

router.get("/search", ProductController.searchProducts, RequestHelper.returnResponse);
router
  .route("/")
  .get(ProductController.getAllProductsController, RequestHelper.returnResponse)
  .post(ProductController.createProductController, RequestHelper.returnResponse);

router
  .route("/:id")
  .get(ProductController.getOneProductController, RequestHelper.returnResponse)
  .post(ProductController.addVendorToProductController, RequestHelper.returnResponse)
  .patch(ProductController.updateOneProductController, RequestHelper.returnResponse)
  .delete(ProductController.deleteOneProductController, RequestHelper.returnResponse);

router
  .route("/:pid/vendor/:vid")
  .delete(ProductController.deletevendorFromProductController, RequestHelper.returnResponse)
  .patch(ProductController.updateVendorInProductController, RequestHelper.returnResponse);
module.exports = router;
