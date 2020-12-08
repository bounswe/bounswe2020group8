const mongoose = require("mongoose");

const AdminToken = mongoose.model("AdminToken");
const Admin = mongoose.model("Admin");

exports.getAdminTokenDB = async function (tokenCode) {
  return AdminToken.findOne({ tokenCode })
    .populate({
      path: "client",
      model: "Admin",
    })
    .lean();
};

exports.populateAdminOfTokenDB = function (tokenObj) {
  return Admin.populate(tokenObj, {
    path: "client",
    model: "Admin",
  });
};

exports.removeAdminTokenDB = function (tokenCode) {
  return AdminToken.findOneAndDelete({
    tokenCode,
  });
};

exports.createAdminTokenDB = function (adminToken) {
  return AdminToken.create(adminToken);
};
