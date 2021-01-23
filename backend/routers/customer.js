const express = require("express");
const CustomerController = require("../controllers/customer");
const ShoppingCartController = require("../controllers/shoppingCart");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");
const router = express.Router();
const OrderController = require("../controllers/order");
const PurchaseController = require("../controllers/purchase");
const RegisterActivity = require("../util/endpoint");

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
router.use(RegisterActivity.registerActivity);

router
  .route("/me")
  .get(CustomerController.getProfile, RequestHelper.returnResponse)
  .patch(CustomerController.patchProfile, RequestHelper.returnResponse)
  .delete(CustomerController.freezeProfile, RequestHelper.returnResponse);

router.get("/", CustomerController.getAllCustomersController, RequestHelper.returnResponse);
router.get(
  "/me/recommendations",
  CustomerController.getProductRecommendationController,
  RequestHelper.returnResponse
);
router
  .route("/:id")
  .get(CustomerController.getOneCustomerController, RequestHelper.returnResponse)
  .patch(CustomerController.updateOneCustomerController, RequestHelper.returnResponse)
  .delete(CustomerController.deleteOneCustomerController, RequestHelper.returnResponse);

router
  .route("/shoppingCart/main")
  .get(ShoppingCartController.getShoppingCartController, RequestHelper.returnResponse)
  .post(ShoppingCartController.updateShoppingCartController, RequestHelper.returnResponse);

router.post(
  "/shoppingCart/delete",
  ShoppingCartController.deleteFromShoppingCartController,
  RequestHelper.returnResponse
);
router.post(
  "/shoppingCart/reset",
  ShoppingCartController.resetShoppingCartController,
  RequestHelper.returnResponse
);

router
  .route("/order/main")
  .get(OrderController.getOrderByCustomerIdController, RequestHelper.returnResponse) // Get by CustomerID
  .post(OrderController.createOrderController, RequestHelper.returnResponse) //  Create order
  .patch(OrderController.updateOrderStatusCustomerController, RequestHelper.returnResponse); // Patch order status

router.post(
  "/order/orderID",
  OrderController.getOrderByOrderIdController,
  RequestHelper.returnResponse
);

router.post("/purchase", PurchaseController.purchaseController, RequestHelper.returnResponse);

module.exports = router;
