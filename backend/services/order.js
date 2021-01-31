const CustomerDataAccess = require("../dataAccess/customer");
const GuestDataAccess = require("../dataAccess/guest");
const OrderDataAccess = require("../dataAccess/order");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const { sha1, sha256 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
const Config = require("../config");
const ProductDataAccess = require("../dataAccess/product");

// Finds all orders with given customerId
exports.getOrderByCustomerIdService = async function ({ _id }) {
  const order = await OrderDataAccess.getOrderByCustomerIdDB(_id);
  return { data: order };
};
// Finds all orders with given vendorId
exports.getOrderByVendorIdService = async function ({ _id }) {
  const order = await OrderDataAccess.getOrderByVendorIdDB(_id);
  return { data: order };
};
// By iterating over vendors orders, calculates his/hers total balance
exports.getVendorBalanceService = async function ({ _id }) {
  const balance = await OrderDataAccess.getVendorBalanceDB(_id);
  return { data: balance };
};
// Finds order by orderID
exports.getOrderByOrderIdService = async function ({ mainOrderID, orderID }) {
  const order = await OrderDataAccess.getOrderByOrderIdDB(mainOrderID, orderID);
  return { data: order };
};
// Finds all orders with given mainOrderID
exports.getOrderByMainOrderIdService = async function ({ mainOrderID }) {
  const order = await OrderDataAccess.getOrderByMainOrderIdDB(mainOrderID);
  return { data: order };
};
// Finds order by given ID's and updates its status
exports.updateOrderStatusCustomerService = async function ({ _id, mainOrderID, orderID, status }) {
  const order = await OrderDataAccess.updateOrderStatusCustomerDB(
    _id,
    mainOrderID,
    orderID,
    status
  );
  if (["cancelled by the customer", "returned"].includes(status)) {
    updatedProduct = await ProductDataAccess.updateProductAmountLeftDB(
      order["orders"][0]["productId"],
      order["orders"][0]["vendorId"],
      order["orders"][0]["amount"]
    );
  }
  return { data: order };
};

// Finds order by given ID's and updates its status
exports.updateOrderStatusVendorService = async function ({ _id, mainOrderID, orderID, status }) {
  const order = await OrderDataAccess.updateOrderStatusVendorDB(_id, mainOrderID, orderID, status);
  if (status === "cancelled  by the vendor") {
    updatedProduct = await ProductDataAccess.updateProductAmountLeftDB(
      order["orders"][0]["productId"],
      order["orders"][0]["vendorId"],
      order["orders"][0]["amount"]
    );
  }
  return { data: order };
};
// Finds order by given ID's and updates its status
exports.updateOrderStatusGuestService = async function ({ mainOrderID, orderID, status }) {
  const order = await OrderDataAccess.updateOrderStatusGuestDB(mainOrderID, orderID, status);
  updatedProduct = await ProductDataAccess.updateProductAmountLeftDB(
    order["orders"][0]["productId"],
    order["orders"][0]["vendorId"],
    order["orders"][0]["amount"]
  );
  return { data: order };
};
// Fetches all items from the shoppingCart and creates an order scheme with them.
exports.createOrderService = async function ({ _id }) {
  const shoppingCart = await CustomerDataAccess.getCustomerShoppingCartDB(_id);
  var items = [];
  var i;
  for (i = 0; i < shoppingCart["shoppingCart"].length; i++) {
    temp = {};
    current = shoppingCart["shoppingCart"][i];
    const current_product = await ProductDataAccess.getProductByVendorIdDB2(
      current["productId"],
      current["vendorId"]
    );
    const current_product_parent_product_id = await ProductDataAccess.getMainProductIDofAProduct(
      current["productId"]
    );
    if (!(current_product == null)) {
      temp["productId"] = current["productId"];
      temp["vendorId"] = current["vendorId"];
      temp["amount"] = current["amount"];
      temp["price"] = current_product["vendorSpecifics"][0]["price"];
      temp["shipmentPrice"] = current_product["vendorSpecifics"][0]["shipmentPrice"];
      temp["cargoCompany"] = current_product["vendorSpecifics"][0]["cargoCompany"];
      if (current_product["vendorSpecifics"][0]["amountLeft"] >= current["amount"]) {
        temp["enoughLeft"] = true;
        temp["amountLeft"] =
          current_product["vendorSpecifics"][0]["amountLeft"] - current["amount"];
        temp["mainProduct_id"] = current_product_parent_product_id[0].parentProduct;
      } else {
        temp["enoughLeft"] = false;
      }
      items.push(temp);
    }
  }
  return { data: items };
};
// Fetches all items from the shoppingCart and creates an order scheme with them.
exports.createGuestOrderService = async function ({ _id }) {
  const shoppingCart = await GuestDataAccess.getGuestShoppingCartDB(_id);
  var items = [];
  var i;
  for (i = 0; i < shoppingCart["shoppingCart"].length; i++) {
    temp = {};
    current = shoppingCart["shoppingCart"][i];
    const current_product = await ProductDataAccess.getProductByVendorIdDB2(
      current["productId"],
      current["vendorId"]
    );
    if (!(current_product == null)) {
      temp["productId"] = current["productId"];
      temp["vendorId"] = current["vendorId"];
      temp["amount"] = current["amount"];
      temp["price"] = current_product["vendorSpecifics"][0]["price"];
      temp["shipmentPrice"] = current_product["vendorSpecifics"][0]["shipmentPrice"];
      temp["cargoCompany"] = current_product["vendorSpecifics"][0]["cargoCompany"];
      if (current_product["vendorSpecifics"][0]["amountLeft"] >= current["amount"]) {
        temp["enoughLeft"] = true;
      } else {
        temp["enoughLeft"] = false;
      }
      items.push(temp);
    }
  }
  return { data: items };
};
