const express = require("express");
const RatingController = require("../controllers/rating");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");
const RegisterActivity = require("../util/endpoint");
const router = express.Router();

// BELOW ARE PROTECTED ROUTES
router.use(authController.protectRoute);
router.use(RegisterActivity.registerActivity);

router
  .route("/:pid")
  .patch(RatingController.patchRatingProductController, RequestHelper.returnResponse);

module.exports = router;
