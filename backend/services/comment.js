const CommentDataAccess = require("../dataAccess/comment");

exports.getCommentsService = async function (mainProductId, customerId) {
  let comments = await CommentDataAccess.findPidAndCid(mainProductId, customerId);
  return { data: comments };
};

exports.getAlCommentsService = async function (mainProductId) {
  let comments = await CommentDataAccess.findPid(mainProductId);
  return { data: comments };
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
  return { data: newComment };
};

exports.updateOneCommentService = async function (_id, text) {
  let updatedComment = await CommentDataAccess.findByIdAndUpdate(_id, text);
  return { data: updatedComment };
};

exports.deleteOneCommentService = async function (_id) {
  let deletedComment = await CommentDataAccess.deleteOne(_id);
  return { data: deletedComment };
};
