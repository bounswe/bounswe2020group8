const express = require("express");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");
const OrderMessageController = require("../controllers/orderMessage");
const RegisterActivity = require("../util/endpoint");
const router = express.Router();

// BELOW ARE PROTECTED
router.use(authController.protectRoute);
router.use(RegisterActivity.registerActivity);

router.post(
  "/all",
  OrderMessageController.getAnOrderMessageOfASuborderController,
  RequestHelper.returnResponse
);
router.get("/", OrderMessageController.getAllOrderMessagesController, RequestHelper.returnResponse);
router.post(
  "/create",
  OrderMessageController.startAnOrderMessageOfASuborderController,
  RequestHelper.returnResponse
);

router
  .route("/:oid")
  .post(TicketController.replyAnOrderMessageOfASuborderController, RequestHelper.returnResponse)
  .delete(TicketController.closeAnOrderMessageOfASuborderController, RequestHelper.returnResponse);

module.exports = router;
