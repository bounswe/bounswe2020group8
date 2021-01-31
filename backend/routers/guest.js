const express = require("express");
const GuestController = require("../controllers/guest");
const ShoppingCartController = require("../controllers/shoppingCart");
const RequestHelper = require("./../util/requestHelper");
const router = express.Router();
const OrderController = require("../controllers/order");
const PurchaseController = require("../controllers/purchase");

router.get("/id", GuestController.getIDController, RequestHelper.returnResponse);

router
  .route("/shoppingCart/main")
  .get(ShoppingCartController.getGuestShoppingCartController, RequestHelper.returnResponse)
  .post(ShoppingCartController.updateGuestShoppingCartController, RequestHelper.returnResponse);

router.post(
  "/shoppingCart/delete",
  ShoppingCartController.deleteFromGuestShoppingCartController,
  RequestHelper.returnResponse
);
router.post(
  "/shoppingCart/reset",
  ShoppingCartController.resetGuestShoppingCartController,
  RequestHelper.returnResponse
);

router
  .route("/order/main")
  .patch(OrderController.updateOrderStatusGuestController, RequestHelper.returnResponse); // Patch order status

router.post(
  "/order/orderID",
  OrderController.getOrderByOrderIdController,
  RequestHelper.returnResponse
);

router.post(
  "/order/mainOrderID",
  OrderController.getOrderByMainOrderIdController,
  RequestHelper.returnResponse
);

router.post("/purchase", PurchaseController.purchaseGuestController, RequestHelper.returnResponse);

module.exports = router;
