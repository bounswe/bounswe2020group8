const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.populateOrderDB = function (data, path = "order") {
  console.log("populateOrderDB");
  console.log(data);
  order = new Order();
  order['orders'] = data['orders'];
  order['_id'] = data['_id'];
  order['customerID'] = data['customerID'];
  order['refundProcess'] = data['refundProcess'];
  // console.log(order);
  order.save(function (err) {
    if (err) return handleError(err);
  // saved!
  });
  return order;

};
