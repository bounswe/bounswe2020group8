const express = require("express");
const AdminController = require("../controllers/admin");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");

const router = express.Router();

router.post("/loginAdmin", AdminController.loginController, RequestHelper.returnResponse);

router.use(authController.protectRoute);

router.get("/activity", AdminController.getAllActivitiesController, RequestHelper.returnResponse);
router.get("/adminInfo", AdminController.getAllAdminInfoController, RequestHelper.returnResponse);
router.get(
  "/activity/:aid",
  AdminController.getOneActivityController,
  RequestHelper.returnResponse
);
router.post("/logoutAdmin", AdminController.logoutController, RequestHelper.returnResponse);

module.exports = router;
