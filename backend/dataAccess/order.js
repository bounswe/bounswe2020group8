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
  return Order.find({ customerID: customerID });
};

// exports.getOrderByVendorIdDB = function (vendorID) {
//   //return Order.find({ "orders.vendorId": vendorID }).select( {"orders.$.vendorId": vendorID});
//   return Order.find({ "orders.vendorId": vendorID }).select({ "orders.$.vendorId": vendorID });
// };

exports.getOrderByVendorIdDB = function (vendorID) {
  return Order.aggregate([
    { $match: { "orders.vendorId": vendorID } },
    {
      $project: {
        orders: {
          $filter: {
            input: "$orders",
            as: "order",
            cond: { $eq: ["$$order.vendorId", vendorID] },
          },
        },
        _id: 1,
        customerID: 1,
      },
    },
  ]);
};

exports.getOrderByOrderIdDB = function (mainOrderID, orderID) {
  console.log(mainOrderID);
  console.log(orderID);
  return Order.findOne({ _id: mainOrderID }).select({
    orders: { $elemMatch: { _id: mongoose.Types.ObjectId(orderID) } },
  });
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
  return Order.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(mainOrderID),
      orders: { $elemMatch: { _id: mongoose.Types.ObjectId(orderID), vendorId: mongoose.Types.ObjectId(clientID), } },
    },
    { $set: { "orders.$.status": status } },
    { new: true }
  ).select({
    orders: { $elemMatch: { _id: mongoose.Types.ObjectId(orderID) } },
  });
};

// exports.getOrderByOrderIdDB = function (mainOrderID, orderID) {
//   console.log(mainOrderID);
//   console.log(orderID);
//   return Order.findOne({ _id: mainOrderID });
// };
