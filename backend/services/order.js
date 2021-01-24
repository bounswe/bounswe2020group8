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

exports.getOrderByCustomerIdService = async function ({ _id }) {
  const order = await OrderDataAccess.getOrderByCustomerIdDB(_id);
  return { data: order };
};

exports.getOrderByVendorIdService = async function ({ _id }) {
  const order = await OrderDataAccess.getOrderByVendorIdDB(_id);
  return { data: order };
};

exports.getVendorBalanceService = async function ({ _id }) {
  const balance = await OrderDataAccess.getVendorBalanceDB(_id);
  return { data: balance };
};

exports.getOrderByOrderIdService = async function ({ mainOrderID, orderID }) {
  const order = await OrderDataAccess.getOrderByOrderIdDB(mainOrderID, orderID);
  return { data: order };
};

exports.updateOrderStatusCustomerService = async function ({ _id, mainOrderID, orderID, status }) {
  const order = await OrderDataAccess.updateOrderStatusCustomerDB(
    _id,
    mainOrderID,
    orderID,
    status
  );
  return { data: order };
};

exports.updateOrderStatusVendorService = async function ({ _id, mainOrderID, orderID, status }) {
  const order = await OrderDataAccess.updateOrderStatusVendorDB(_id, mainOrderID, orderID, status);
  return { data: order };
};

exports.updateOrderStatusGuestService = async function ({ mainOrderID, orderID, status }) {
  const order = await OrderDataAccess.updateOrderStatusGuestDB(mainOrderID, orderID, status);
  return { data: order };
};

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
      if (current_product["vendorSpecifics"][0]["amountLeft"] > current["amount"]) {
        temp["enoughLeft"] = true;
        temp["amountLeft"] = current_product["vendorSpecifics"][0]["amountLeft"];
        temp["mainProduct_id"] = current_product_parent_product_id;
      } else {
        temp["enoughLeft"] = false;
      }
      items.push(temp);
    }
  }
  return { data: items };
};

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
      if (current_product["vendorSpecifics"][0]["amountLeft"] > current["amount"]) {
        temp["enoughLeft"] = true;
      } else {
        temp["enoughLeft"] = false;
      }
      items.push(temp);
    }
  }
  return { data: items };
};
