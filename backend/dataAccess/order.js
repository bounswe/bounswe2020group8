const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.populateOrderDB = function (data, path = "order") {
  console.log("populateOrderDB");
  console.log(data);
  order = new Order();
  order["orders"] = data["orders"];
  order["_id"] = data["_id"];
  order["customerID"] = data["customerID"];
  order["refundProcess"] = data["refundProcess"];
  order.save(function (err) {
    if (err) return handleError(err);
  });
  return order;
};

exports.getOrderByCustomerIdDB = function (customerID) {
  console.log(customerID);
  return Order.find({ customerID: customerID });
};

exports.getProductTagsInLastOrders = function (customerID) {
  console.log(customerID);
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
  console.log(customerID);
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
