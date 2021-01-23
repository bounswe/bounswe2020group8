const CustomerDataAccess = require("../dataAccess/customer");
const GuestDataAccess = require("../dataAccess/guest");
const ProductDataAccess = require("../dataAccess/product");
const VendorDataAccess = require("../dataAccess/vendor");
const MainProductDataAccess = require("../dataAccess/mainProduct");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const { sha1, sha256 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
const Config = require("../config");

exports.updateShoppingCartService = async function ({ _id, productId, vendorId, amount }) {
  temp = {};
  const current_product = await ProductDataAccess.getProductByVendorIdDB3(productId, vendorId);
  if (!(current_product == null)) {
    temp["productId"] = productId;
    temp["vendorId"] = vendorId;
    temp["amount"] = amount;
    temp["price"] = current_product["vendorSpecifics"][0]["price"];
    temp["shipmentPrice"] = current_product["vendorSpecifics"][0]["shipmentPrice"];
    temp["cargoCompany"] = current_product["vendorSpecifics"][0]["cargoCompany"];
    temp["parentProduct"] = current_product["parentProduct"];
    temp["photos"] = current_product["photos"];
  }
  const current_main_product = await MainProductDataAccess.getMainProductByIdDB(
    temp["parentProduct"]
  );
  if (!(current_main_product == null)) {
    temp["title"] = current_main_product["title"];
  }
  const current_vendor = await VendorDataAccess.getVendorByIdDB(temp["vendorId"]);
  if (!(current_vendor == null)) {
    temp["vendorName"] = current_vendor["name"] + " " + current_vendor["lastName"];
  }
  updatedCustomer = await CustomerDataAccess.addToCustomerShoppingCartDB(
    _id,
    productId,
    vendorId,
    amount,
    temp["price"],
    temp["shipmentPrice"],
    temp["cargoCompany"],
    temp["title"],
    temp["vendorName"],
    temp["photos"]
  );
  updatedCustomer = await CustomerDataAccess.updateCustomerShoppingCartDB(
    _id,
    productId,
    vendorId,
    amount
  );
  return { data: updatedCustomer };
};

exports.updateGuestShoppingCartService = async function ({ _id, productId, vendorId, amount }) {
  temp = {};
  const current_product = await ProductDataAccess.getProductByVendorIdDB3(productId, vendorId);
  if (!(current_product == null)) {
    temp["productId"] = productId;
    temp["vendorId"] = vendorId;
    temp["amount"] = amount;
    temp["price"] = current_product["vendorSpecifics"][0]["price"];
    temp["shipmentPrice"] = current_product["vendorSpecifics"][0]["shipmentPrice"];
    temp["cargoCompany"] = current_product["vendorSpecifics"][0]["cargoCompany"];
    temp["parentProduct"] = current_product["parentProduct"];
    temp["photos"] = current_product["photos"];
  }
  const current_main_product = await MainProductDataAccess.getMainProductByIdDB(
    temp["parentProduct"]
  );
  if (!(current_main_product == null)) {
    temp["title"] = current_main_product["title"];
  }
  const current_vendor = await VendorDataAccess.getVendorByIdDB(temp["vendorId"]);
  if (!(current_vendor == null)) {
    temp["vendorName"] = current_vendor["name"] + " " + current_vendor["lastName"];
  }
  updatedCustomer = await GuestDataAccess.addToGuestShoppingCartDB(
    _id,
    productId,
    vendorId,
    amount,
    temp["price"],
    temp["shipmentPrice"],
    temp["cargoCompany"],
    temp["title"],
    temp["vendorName"],
    temp["photos"]
  );
  updatedCustomer = await GuestDataAccess.updateGuestShoppingCartDB(
    _id,
    productId,
    vendorId,
    amount
  );
  return { data: updatedCustomer };
};

exports.deleteFromShoppingCartService = async function ({ _id, productId, vendorId }) {
  const updatedCustomer = await CustomerDataAccess.deleteFromCustomerShoppingCartDB(
    _id,
    productId,
    vendorId
  );
  return { data: updatedCustomer };
};

exports.deleteFromGuestShoppingCartService = async function ({ _id, productId, vendorId }) {
  var shoppingCart = await GuestDataAccess.updateGuestShoppingCartActivityDB(_id);
  const updatedCustomer = await GuestDataAccess.deleteFromGuestShoppingCartDB(
    _id,
    productId,
    vendorId
  );
  return { data: updatedCustomer };
};

exports.resetShoppingCartService = async function ({ _id }) {
  const updatedCustomer = await CustomerDataAccess.resetCustomerShoppingCartDB(_id);
  return { data: updatedCustomer };
};

exports.resetGuestShoppingCartService = async function ({ _id }) {
  var shoppingCart = await GuestDataAccess.updateGuestShoppingCartActivityDB(_id);
  const updatedCustomer = await GuestDataAccess.resetGuestShoppingCartDB(_id);
  return { data: updatedCustomer };
};

exports.getShoppingCartService = async function ({ _id }) {
  const shoppingCart = await CustomerDataAccess.getCustomerShoppingCartDB(_id);
  return { data: shoppingCart["shoppingCart"] };
};

exports.getGuestShoppingCartService = async function ({ _id }) {
  var shoppingCart = await GuestDataAccess.updateGuestShoppingCartActivityDB(_id);
  shoppingCart = await GuestDataAccess.getGuestShoppingCartDB(_id);
  return { data: shoppingCart["shoppingCart"] };
};
