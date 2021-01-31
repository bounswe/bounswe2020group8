const mongoose = require("mongoose");
const Watcher = mongoose.model("Watcher");

exports.getAllClientsOfAProductAndAVendor = function (pid, vid) {
  // let pidObj = mongoose.Types.ObjectId(pid);
  // let vidObj = mongoose.Types.ObjectId(vid);
  return Watcher.find({ product_id: pid, vendor_id: vid }).lean();
};

exports.getAllWatchersOfAClient = function (cid) {
  let cidObj = mongoose.Types.ObjectId(cid);
  return Watcher.find({ client_id: cidObj }).lean();
};

exports.createAWatcher = function (watcher) {
  return Watcher.create(watcher);
};

exports.deleteAWatcher = function (_id) {
  return Watcher.deleteOne({ _id });
};
