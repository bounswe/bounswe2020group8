const mongoose = require("mongoose");
const Activity = mongoose.model("Activity");

exports.getActivityByIdDB = function (_id) {
  return Activity.findById(_id).lean();
};

exports.createActivityDB = function (activity) {
  return Activity.create(activity);
};

exports.getAllActivityDB = function () {
  return Activity.find().lean();
};
