const express = require("express");
const CategoryController = require("../controllers/category");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");
const router = express.Router();

router
  .route("/")
  .get(CategoryController.getAllCategoryController, RequestHelper.returnResponse)
  .post(CategoryController.createOneCategoryController, RequestHelper.returnResponse);

// BELOW ARE PROTECTED ROUTES
router.use(authController.protectRoute);

router
  .route("/:id")
  .get(CategoryController.getOneCategoryController, RequestHelper.returnResponse)
  .patch(CategoryController.updateOneCategoryController, RequestHelper.returnResponse)
  .delete(CategoryController.deleteOneCategoryController, RequestHelper.returnResponse);

module.exports = router;
