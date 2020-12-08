const express = require("express");
const ClientController = require("../controllers/authClient");
const RequestHelper = require("./../util/requestHelper");

const router = express.Router();

router.post("/login", ClientController.loginController, RequestHelper.returnResponse);
router.get("/verifyEmail", ClientController.verifyEmailController, RequestHelper.returnResponse);
router.post(
  "/changePassword",
  ClientController.protectRoute,
  ClientController.changePasswordController,
  RequestHelper.returnResponse
);
router.post(
  "/forgotPassword",
  ClientController.forgotPasswordController,
  RequestHelper.returnResponse
);
router.post(
  "/resetPassword",
  ClientController.resetPasswordController,
  RequestHelper.returnResponse
);

module.exports = router;
