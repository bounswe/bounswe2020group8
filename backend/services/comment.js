const CommentDataAccess = require("../dataAccess/comment");

exports.getCommentsService = async function (mainProductId, customerId) {
  return await CommentDataAccess.findPidAndCid(mainProductId, customerId);
};

exports.getAlCommentsService = async function (mainProductId) {
  return await CommentDataAccess.findPid(mainProductId);
};

exports.createOneCommentService = async function (req) {
  let mainProductId = req.params.pid;
  let customerId = req.client._id;
  let { text } = req.body;

  const newComment = (
    await CommentDataAccess.createOne({
      mainProductId,
      customerId,
      text,
    })
  ).toObject();
  return newComment;
};

exports.updateOneCommentService = async function (_id, text) {
  return await CommentDataAccess.findByIdAndUpdate(_id, text);
};

exports.deleteOneCommentService = async function (_id) {
  return await CommentDataAccess.deleteOne(_id);
};
