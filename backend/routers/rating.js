const express = require("express");
const RatingController = require("../controllers/rating");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");
const RegisterActivity = require("../util/endpoint");
const router = express.Router();

router
  .route("/:vid")
  .patch(RatingController.patchRatingVendorController, RequestHelper.returnResponse);

module.exports = router;
