const express = require("express");
const CategoryController = require("../controllers/category");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");
const router = express.Router();

// BELOW ARE PROTECTED ROUTES
router.use(authController.protectRoute);

router.get("/", CategoryController.getAllCategoryController, RequestHelper.returnResponse);
router.post("/", CategoryController.createOneCategoryController, RequestHelper.returnResponse);

router
  .route("/:id")
  .get(CategoryController.getOneCategoryController, RequestHelper.returnResponse)
  .patch(CategoryController.updateOneCategoryController, RequestHelper.returnResponse)
  .delete(CategoryController.deleteOneCategoryController, RequestHelper.returnResponse);

module.exports = router;
