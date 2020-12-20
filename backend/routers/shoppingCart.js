const express = require("express");
const CustomerController = require("../controllers/customer");
const ShoppingCartController = require("../controllers/shoppingCart");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");
const router = express.Router();

console.log("hey!")

router.post("/add", ShoppingCartController.addToCartController, RequestHelper.returnResponse);

module.exports = router;
