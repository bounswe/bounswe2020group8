const express = require("express");
const VendorController = require("../controllers/vendor");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");

const router = express.Router();

router.post("/signup", VendorController.signupController, RequestHelper.returnResponse);
router.get(
  "/public/:id",
  VendorController.getOneVendorPublicController,
  RequestHelper.returnResponse
);
router.use(authController.protectRoute);

// BELOW ARE PROTECTED ROUTES
router.get("/", VendorController.getAllVendorsController, RequestHelper.returnResponse);

router
  .route("/:id")
  .get(VendorController.getOneVendorController, RequestHelper.returnResponse)
  .patch(VendorController.updateOneVendorController, RequestHelper.returnResponse)
  .delete(VendorController.deleteOneVendorController, RequestHelper.returnResponse);

router
  .route("/me")
  .get(VendorController.getProfile, RequestHelper.returnResponse)
  .patch(VendorController.patchProfile, RequestHelper.returnResponse)
  .delete(VendorController.freezeProfile, RequestHelper.returnResponse);

router.get(
  "/me/product",
  VendorController.getAllMyProductsController,
  RequestHelper.returnResponse
);

router.get(
  "/me/mainProduct",
  VendorController.getAllMyMainProductsController,
  RequestHelper.returnResponse
);
router
  .route("/me/product/:id")
  .get(VendorController.getMyProductController, RequestHelper.returnResponse)
  .patch(VendorController.updateMyProductController, RequestHelper.returnResponse)
  .delete(VendorController.deleteMyProductController, RequestHelper.returnResponse);

router.delete(
  "/me/mainProduct/:mpid",
  VendorController.deleteMeFromMainProductController,
  RequestHelper.returnResponse
);

router.post(
  "/me/product/existing/:pid",
  VendorController.addMeToExistingProductController,
  RequestHelper.returnResponse
);

router.post(
  "/me/product/new",
  VendorController.createMyNewProductController,
  RequestHelper.returnResponse
);

router.get(
  "/me/productRequest",
  VendorController.getAllMyProductRequestsController,
  RequestHelper.returnResponse
);

router
  .route("/me/productRequest/:id")
  .get(VendorController.getMyProductRequestController, RequestHelper.returnResponse)
  .patch(VendorController.updateMyProductRequestController, RequestHelper.returnResponse)
  .delete(VendorController.deleteMyProductRequestController, RequestHelper.returnResponse);

module.exports = router;
