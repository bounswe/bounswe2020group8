const CustomerDataAccess = require("../dataAccess/customer");
const ShoppingCartService = require("../services/shoppingCart");
const WatcherDataAccess = require("../dataAccess/watcher");
const ProductDataAccess = require("../dataAccess/product");
const MainProductDataAccess = require("../dataAccess/mainProduct");
const Messages = require("../util/messages");
const mongoose = require("mongoose");

exports.getWatchListService = async function (_id) {
  let watchlist = await WatcherDataAccess.getAllWatchersOfAClient(_id);
  let watchlistPopulated = new Array();
  for (let i = 0; i < watchlist.length; i++) {
    let watcherPopulated = await ProductDataAccess.getProductByProductIDAndVendorID2(
      watchlist[i].product_id,
      watchlist[i].vendor_id
    );
    watcherPopulated = watcherPopulated[0];
    watcherPopulated.parentProduct = watcherPopulated.parentProduct[0];
    watcherPopulated.default = watcherPopulated.vendorInfo;
    delete watcherPopulated.vendorInfo;
    watchlistPopulated.push({ _id: watchlist[i]._id, data: watcherPopulated });
  }
  return { result: watchlistPopulated.length, data: watchlistPopulated };
};

exports.addWatcherOfAClientService = async function (_watcher) {
  let initialCheck = await WatcherDataAccess.getAllWatchersOfAClient(_watcher.client_id);
  for (let i = 0; i < initialCheck.length; i++) {
    let current_watcher = initialCheck[i];
    if (
      current_watcher.product_id === _watcher.product_id &&
      current_watcher.vendor_id === _watcher.vendor_id
    ) {
      throw new AppError(Messages.RETURN_MESSAGES.ERR_WATCHER_ALREADY_EXISTS);
    }
  }
  let result = await WatcherDataAccess.createAWatcher(_watcher);
  return { data: result };
};

exports.removeWatcherOfAClientService = async function (_id) {
  await WatcherDataAccess.deleteAWatcher(_id);
  return { data: {} };
};

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
  let allLists = customer.shoppingLists;
  let allListsPopulated = new Array();
  for (let i = 0; i < allLists.length; i++) {
    let unpopulatedList = await CustomerDataAccess.getOneShoppingListByIdDB(
      customer._id,
      allLists[i]._id
    );
    unpopulatedList = unpopulatedList[0].shoppingList;
    listId = unpopulatedList._id;
    listTitle = unpopulatedList.title;
    let currentListPopulated = new Array();
    for (let j = 0; j < unpopulatedList.wishedProducts.length; j++) {
      let productInfo = unpopulatedList.wishedProducts[j];
      let currentProduct = await ProductDataAccess.getProductByIdDB(productInfo.productId);
      let currentMainProduct = await MainProductDataAccess.getMainProductByIdDB(
        currentProduct.parentProduct
      );
      currentProduct.parentProduct = currentMainProduct;
      currentListPopulated.push(currentProduct);
    }
    allListsPopulated.push({ _id: listId, title: listTitle, wishedProducts: currentListPopulated });
  }
  return { result: allListsPopulated.length, data: allListsPopulated };
};

exports.getAllListsServiceJustIDs = async function (customer) {
  let allLists = customer.shoppingLists;
  return { result: allLists.length, data: allLists };
};

exports.deleteAllListsService = async function (customer) {
  let dbResults = await CustomerDataAccess.deleteAllShoppingListsDB(customer._id);
  return { data: dbResults };
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
  return {};
};
