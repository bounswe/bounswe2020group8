const CustomerDataAccess = require("../dataAccess/customer");
const ShoppingCartService = require("../services/shoppingCart");
const mongoose = require("mongoose");

exports.getOneListService = async function (_id, customer) {
  let result = null;
  let vendorIds = [];
  for (i = 0; i < customer.shoppingLists.length; i++) {
    if (customer.shoppingLists[i]._id == _id) {
      result = customer.shoppingLists[i];
      break;
    }
  }
  for (i = 0; i < result.wishedProducts.length; i++) {
    vendorIds.push(result.wishedProducts[i].vendorId);
  }
  let dbResult = await CustomerDataAccess.getOneShoppingListByIdDB(customer._id, _id);
  let productData = dbResult[0].data;
  for (i = 0; i < productData.length; i++) {
    productData[i].vendorId = vendorIds[i];
  }
  return { result: productData.length, data: productData };
};

exports.createOneListService = async function (title, wishedProducts, customer) {
  wishedProducts = wishedProducts.map((el) => {
    let temp = Object.assign({}, el);
    temp.productId = mongoose.Types.ObjectId(el.productId);
    return temp;
  });
  const newShoppingList = {
    title,
    wishedProducts,
  };
  const newCustomerState = (
    await CustomerDataAccess.updateShoppingListsDB(customer._id, newShoppingList)
  ).toObject();
  return { results: newCustomerState.shoppingLists.length, data: newCustomerState.shoppingLists };
};

exports.updateOneListService = async function (_id, customer, title, wishedProducts) {
  await CustomerDataAccess.patchOneShoppingListByIdDB(_id, customer._id, title, wishedProducts);
  return await exports.getOneListService(_id, customer);
};

exports.deleteOneListService = async function (_id, customer) {
  let dbResults = await exports.getOneListService(_id, customer);
  await CustomerDataAccess.deleteOneShoppingListByIdDB(_id, customer._id);
  return dbResults;
};

exports.getAllListsService = async function (customer) {
  let dbResults = new Array();
  console.log(customer);
  for (i = 0; i < customer.shoppingLists.length; i++) {
    let currentList = customer.shoppingLists[i];
    let _id = currentList._id;
    let itemList = await exports.getOneListService(_id, customer);
    dbResults.push({ _id, title: currentList.title, wishedProducts: itemList });
  }
  return dbResults;
};

exports.deleteAllListsService = async function (customer) {
  let dbResults = await CustomerDataAccess.deleteAllShoppingListsDB(customer._id);
  return {};
};

exports.exportOneListService = async function (_id, customer) {
  let dbResults = await exports.getOneListService(_id, customer);
  for (i = 0; i < dbResults.data.length; i++) {
    let currentItem = dbResults.data[i];
    let currentCart = {
      _id: customer._id,
      productId: currentItem._id,
      vendorId: currentItem.vendorId,
      amount: 1,
    };
    await ShoppingCartService.updateShoppingCartService(currentCart);
  }
  return {};
};

exports.exportAllListsService = async function (customer) {
  for (i = 0; i < customer.shoppingLists.length; i++) {
    await exports.exportOneListService(customer.shoppingLists[i]._id, customer);
  }
  return dbResults;
};
