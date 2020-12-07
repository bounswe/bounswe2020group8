const express = require("express");
const VendorController = require("../controllers/vendor");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");

const router = express.Router();

router.post("/signup", VendorController.signupController, RequestHelper.returnResponse);

// BELOW ARE PROTECTED ROUTES
router.use(authController.protectRoute);

router.get("/", VendorController.getAllVendorsController, RequestHelper.returnResponse);

router
  .route("/:id")
  .get(VendorController.getOneVendorController, RequestHelper.returnResponse)
  .patch(VendorController.updateOneVendorController, RequestHelper.returnResponse)
  .delete(VendorController.deleteOneVendorController, RequestHelper.returnResponse);

module.exports = router;
