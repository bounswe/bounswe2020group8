const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.populateOrderDB = function (data, path = "order") {
  console.log("populateOrderDB");
  // console.log(data);
  order = new Order();
  order['orders'] = data['orders'];
  // console.log(order);
  return order.save(function (err) {
    if (err) return handleError(err);
  // saved!
  });
  // return Order.populate(obj, {
  //   path,
  //   model: "Order",
  // });
};
