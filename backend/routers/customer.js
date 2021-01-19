const express = require("express");
const CustomerController = require("../controllers/customer");
const ShoppingCartController = require("../controllers/shoppingCart");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");
const router = express.Router();
const OrderController = require("../controllers/order");
const PurchaseController = require("../controllers/purchase");

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

router
  .route("/me")
  .get(CustomerController.getProfile, RequestHelper.returnResponse)
  .patch(CustomerController.patchProfile, RequestHelper.returnResponse)
  .delete(CustomerController.freezeProfile, RequestHelper.returnResponse);

router.get("/", CustomerController.getAllCustomersController, RequestHelper.returnResponse);

router
  .route("/:id")
  .get(CustomerController.getOneCustomerController, RequestHelper.returnResponse)
  .patch(CustomerController.updateOneCustomerController, RequestHelper.returnResponse)
  .delete(CustomerController.deleteOneCustomerController, RequestHelper.returnResponse);

router.post(
  "/shoppingCart/update",
  ShoppingCartController.updateShoppingCartController,
  RequestHelper.returnResponse
);
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
router.post(
  "/shoppingCart/get",
  ShoppingCartController.getShoppingCartController,
  RequestHelper.returnResponse
);
router.post("/order/create", OrderController.createOrderController, RequestHelper.returnResponse);
router.post(
  "/order/getByCustomerID",
  OrderController.getOrderByCustomerIdController,
  RequestHelper.returnResponse
);
router.get(
  "/order/orderID",
  OrderController.getOrderByOrderIdController,
  RequestHelper.returnResponse
);
router.patch(
  "/order/status",
  OrderController.updateOrderStatusController,
  RequestHelper.returnResponse
);
router.post("/purchase", PurchaseController.purchaseController, RequestHelper.returnResponse);


module.exports = router;
