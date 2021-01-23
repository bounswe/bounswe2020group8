const express = require("express");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");
const TicketController = require("../controllers/ticket");
const RegisterActivity = require("../util/endpoint");
const router = express.Router();

// BELOW ARE PROTECTED
router.use(authController.protectRoute);
router.use(RegisterActivity.registerActivity);

router.get("/", TicketController.getAllTicketController, RequestHelper.returnResponse);
router.post("/", TicketController.createOneTicketController, RequestHelper.returnResponse);
router.get("/all", TicketController.getAllActiveTicketController, RequestHelper.returnResponse);
router.get(
  "/all/unassigned",
  TicketController.getAllActiveUnassignedTicketController,
  RequestHelper.returnResponse
);
router.get(
  "/admin/:aid",
  TicketController.getAllTicketofAdminController,
  RequestHelper.returnResponse
);
router.get(
  "/all/admin/:aid",
  TicketController.getAllActiveTicketofAdminController,
  RequestHelper.returnResponse
);
router.get(
  "/client/:cid",
  TicketController.getAllTicketofClientController,
  RequestHelper.returnResponse
);
router.get(
  "/all/client/:cid",
  TicketController.getAllActiveTicketofClientController,
  RequestHelper.returnResponse
);
router.get(
  "/admin/:aid/client/:cid",
  TicketController.getAllTicketofClientAndAdminController,
  RequestHelper.returnResponse
);
router.get(
  "/all/admin/:aid/client/:cid",
  TicketController.getAllActiveTicketofClientAndAdminController,
  RequestHelper.returnResponse
);

router
  .route("/:tid")
  .get(TicketController.getOneTicketController, RequestHelper.returnResponse)
  .post(TicketController.replyATicketController, RequestHelper.returnResponse)
  .patch(TicketController.forwardATicketController, RequestHelper.returnResponse)
  .delete(TicketController.closeOneTicketController, RequestHelper.returnResponse);

module.exports = router;
