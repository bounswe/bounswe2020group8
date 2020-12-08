const express = require("express");
const CustomerController = require("../controllers/customer");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");
const router = express.Router();

router.post("/signup", CustomerController.signupController, RequestHelper.returnResponse);
router.post(
  "/signupWithGoogle",
  CustomerController.signupWithGoogleController,
  RequestHelper.returnResponse
);
router.post(
  "/loginWithGoogle",
  CustomerController.loginWithGoogleController,
  RequestHelper.returnResponse
);

// BELOW ARE PROTECTED ROUTES
router.use(authController.protectRoute);

router.post("/me", CustomerController.getProfile, RequestHelper.returnResponse);
router.patch("/me", CustomerController.patchProfile, RequestHelper.returnResponse);
router.delete("/me", CustomerController.deleteUser, RequestHelper.returnResponse);

router.get("/", CustomerController.getAllCustomersController, RequestHelper.returnResponse);

router
  .route("/:id")
  .get(CustomerController.getOneCustomerController, RequestHelper.returnResponse)
  .patch(CustomerController.updateOneCustomerController, RequestHelper.returnResponse)
  .delete(CustomerController.deleteOneCustomerController, RequestHelper.returnResponse);

module.exports = router;
