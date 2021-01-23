const express = require("express");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");
const ListController = require("../controllers/list");
const RegisterActivity = require("../util/endpoint");
const router = express.Router();

// BELOW ARE PROTECTED
router.use(authController.protectRoute);
router.use(RegisterActivity.registerActivity);

router
  .route("/watchlist")
  .get(ListController.getWatchListController, RequestHelper.returnResponse)
  .post(ListController.addProductToWatchListController, RequestHelper.returnResponse)
  .delete(ListController.removeProductFromWatchListController, RequestHelper.returnResponse);

router.route("/").post(ListController.createOneListController, RequestHelper.returnResponse);
router
  .route("/all/export")
  .post(ListController.exportAllListsController, RequestHelper.returnResponse);

router
  .route("/all")
  .get(ListController.getAllListsController, RequestHelper.returnResponse)
  .delete(ListController.deleteAllListsController, RequestHelper.returnResponse);

router
  .route("/:lid")
  .get(ListController.getOneListController, RequestHelper.returnResponse)
  .patch(ListController.updateOneListController, RequestHelper.returnResponse)
  .delete(ListController.deleteOneListController, RequestHelper.returnResponse);

router
  .route("/:lid/export")
  .post(ListController.exportOneListController, RequestHelper.returnResponse);

module.exports = router;
