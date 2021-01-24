const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

exports.findPidAndCid = function (mainProductId, customerId) {
  return Comment.find({ mainProductId, customerId }).lean();
};

exports.findPid = function (mainProductId) {
  return Comment.find({ mainProductId }).lean();
};

exports.createOne = function (comment) {
  return Comment.create(comment);
};

exports.getACommentByID = function (_id) {
  return Comment.find({ _id }).lean();
};

exports.findByIdAndUpdate = function (_id, text, rate) {
  return Comment.findByIdAndUpdate(
    _id,
    {
      $set: {
        text: text,
        rate: rate,
        updatedAt: Date.now,
      },
    },
    { _id: 1, new: true }
  );
};

exports.deleteOne = function (_id) {
  return Comment.findByIdAndDelete(_id).lean();
};
