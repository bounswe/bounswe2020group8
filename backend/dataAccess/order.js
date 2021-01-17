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

exports.getOrderByOrderIdDB = function (mainOrderID, orderID) {
  console.log(mainOrderID);
  console.log(orderID);
  return Order.findOne({ _id: mainOrderID }).select({orders: { $elemMatch: { _id: mongoose.Types.ObjectId(orderID) } } });
  // return Order.findOne({ _id: mainOrderID }).select({orders: { $elemMatch: { price: 420 } } });
};

// exports.getOrderByOrderIdDB = function (mainOrderID, orderID) {
//   console.log(mainOrderID);
//   console.log(orderID);
//   return Order.findOne({ _id: mainOrderID });
// };
