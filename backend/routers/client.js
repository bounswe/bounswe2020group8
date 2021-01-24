const express = require("express");
const ClientController = require("../controllers/authClient");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");

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

router.post(
  "/logout",
  authController.protectRoute,
  ClientController.logoutController,
  RequestHelper.returnResponse
);

router.use(authController.protectRoute);
router
  .route("/notification")
  .get(ClientController.getNotificationController, RequestHelper.returnResponse)
  .post(ClientController.readNotificationController, RequestHelper.returnResponse);

module.exports = router;
