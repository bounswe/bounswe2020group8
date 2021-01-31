const mongoose = require("mongoose");

const Admin = mongoose.model("Admin");

exports.populateAdminDB = function (obj, path = "admin") {
  return Admin.populate(obj, {
    path,
    model: "Admin",
  });
};

exports.getAdminByEmailDB = function (email) {
  return Admin.findOne({
    email,
  }).lean();
};

exports.getAdminByIdDB = function (_id) {
  return Admin.findById(_id).lean();
};

exports.getAllAdmin = function () {
  return Admin.find().lean();
};
