const express = require("express");
const CustomerController = require("../controllers/customer");
const ShoppingCartController = require("../controllers/shoppingCart");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");
const router = express.Router();

router.post(
  "/update",
  ShoppingCartController.updateShoppingCartController,
  RequestHelper.returnResponse
);
router.post(
  "/delete",
  ShoppingCartController.deleteFromShoppingCartController,
  RequestHelper.returnResponse
);

module.exports = router;
