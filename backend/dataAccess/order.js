const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.populateOrderDB = function (data, path = "order") {
  order = new Order();
  order["orders"] = data["orders"];
  order["_id"] = data["_id"];
  order["customerID"] = data["customerID"];
  order["createdAt"] = data["createdAt"];
  order.save(function (err) {
    if (err) return handleError(err);
  });
  return order;
};

exports.getOrderByCustomerIdDB = function (customerID) {
  return Order.find({ customerID: customerID });
};

exports.getOrderByVendorIdDB = function (vendorID) {
  return Order.aggregate([
    { $match: { "orders.vendorId": mongoose.Types.ObjectId(vendorID) } },
    {
      $project: {
        orders: {
          $filter: {
            input: "$orders",
            as: "order",
            cond: { $eq: ["$$order.vendorId", mongoose.Types.ObjectId(vendorID)] },
          },
        },
        _id: 1,
        customerID: 1,
      },
    },
  ]);
};

exports.getVendorBalanceDB = function (_id) {
  return Order.aggregate([
    { $match: { "orders.vendorId": mongoose.Types.ObjectId(_id) } },
    { $unwind: "$orders" },
    {
      $match: {
        "orders.vendorId": mongoose.Types.ObjectId(_id),
        "orders.status": { $in: ["being prepared", "on the way"] },
      },
    },
    {
      $group: {
        _id: null,
        balance: { $sum: { $multiply: ["$orders.price", "$orders.amount"] } },
      },
    },
    { $project: { _id: 0, balance: 1 } },
  ]);
};

exports.getOrderByOrderIdDB = function (mainOrderID, orderID) {
  return Order.findOne({ _id: mainOrderID }).select({
    orders: { $elemMatch: { _id: mongoose.Types.ObjectId(orderID) } },
  });
};

exports.getOrderByMainOrderIdDB = function (mainOrderID) {
  return Order.findOne({ _id: mainOrderID });
};

exports.updateOrderStatusCustomerDB = function (clientID, mainOrderID, orderID, status) {
  return Order.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(mainOrderID),
      customerID: mongoose.Types.ObjectId(clientID),
      orders: { $elemMatch: { _id: mongoose.Types.ObjectId(orderID) } },
    },
    { $set: { "orders.$.status": status } },
    { new: true }
  ).select({
    orders: { $elemMatch: { _id: mongoose.Types.ObjectId(orderID) } },
  });
};

exports.updateOrderStatusVendorDB = function (clientID, mainOrderID, orderID, status) {
  clientID = clientID.toString();
  return Order.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(mainOrderID),
      orders: { $elemMatch: { _id: mongoose.Types.ObjectId(orderID), vendorId: clientID } },
    },
    { $set: { "orders.$.status": status } },
    { new: true }
  ).select({
    orders: { $elemMatch: { _id: mongoose.Types.ObjectId(orderID) } },
  });
};

exports.updateOrderStatusGuestDB = function (mainOrderID, orderID, status) {
  return Order.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(mainOrderID),
      orders: { $elemMatch: { _id: mongoose.Types.ObjectId(orderID) } },
    },
    { $set: { "orders.$.status": status } },
    { new: true }
  ).select({
    orders: { $elemMatch: { _id: mongoose.Types.ObjectId(orderID) } },
  });
};
exports.getProductTagsInLastOrders = function (customerID) {
  return Order.aggregate([
    { $match: { customerID } },
    { $sort: { createdAt: -1 } },
    { $limit: 5 },
    {
      $project: {
        products: "$orders.productId",
      },
    },
    { $unwind: "$products" },
    {
      $lookup: {
        from: "Products",
        localField: "products",
        foreignField: "_id",
        as: "products",
      },
    },
    { $project: { tags: "$products.tags" } },
    { $group: { _id: {}, tags: { $push: "$tags" } } },
    {
      $set: {
        tags: {
          $reduce: {
            input: "$tags",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] },
          },
        },
      },
    },
  ]);
};

exports.getProductsInLastOrders = function (customerID) {
  return Order.aggregate([
    { $match: { customerID } },
    { $sort: { createdAt: -1 } },
    { $limit: 5 },
    {
      $project: {
        products: "$orders.productId",
      },
    },
    { $unwind: "$products" },
    {
      $lookup: {
        from: "Products",
        localField: "products",
        foreignField: "_id",
        as: "products",
      },
    },
    { $project: { parentProduct: "$products.parentProduct" } },
    { $group: { _id: {}, parentProducts: { $push: "$parentProduct" } } },
    {
      $addFields: {
        parentProducts: { $setUnion: ["$parentProducts", []] },
      },
    },
  ]);
};
