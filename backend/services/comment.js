const CommentDataAccess = require("../dataAccess/comment");
const MainProductDataAccess = require("../dataAccess/mainProduct");

exports.getCommentsService = async function (mainProductId, customerId) {
  let comments = await CommentDataAccess.findPidAndCid(mainProductId, customerId);
  return { results: comments.length, data: comments };
};

exports.getAlCommentsService = async function (mainProductId) {
  let comments = await CommentDataAccess.findPid(mainProductId);
  return { results: comments.length, data: comments };
};

exports.createOneCommentService = async function (mainProductId, customerId, text, rate) {
  if (rate != undefined) {
    const mainProduct = MainProductDataAccess.getMainProductByIdDB(mainProductId);
    const prevNumber = mainProduct.numberOfRating;
    const prevRate = mainProduct.rating;
    let newRate = (prevNumber * prevRate + rate) / (prevNumber + 1);
    newRate = newRate.toFixed(2);
    await MainProductDataAccess.updateMainProductDB(mainProductId, {
      rate: newRate,
      numberOfRating: prevNumber + 1,
    });
    const newComment = (
      await CommentDataAccess.createOne({
        mainProductId,
        customerId,
        text,
        rate,
      })
    ).toObject();
    return { results: 1, data: newComment };
  } else {
    const newComment = (
      await CommentDataAccess.createOne({
        mainProductId,
        customerId,
        text,
        rate: null,
      })
    ).toObject();
    return { results: 1, data: newComment };
  }
};

exports.updateOneCommentService = async function (_id, text, rate) {
  let prevComment = await CommentDataAccess.getACommentByID(_id);
  if ((prevComment.rate != null) & (rate != null)) {
    const prevMainProduct = MainProductDataAccess.getMainProductByIdDB(prevComment.mainProductId);
    const prevNumber = prevMainProduct.numberOfRating;
    const prevRate = prevMainProduct.rating;
    let newRate = (prevRate * prevNumber - prevComment.rate + rate) / prevNumber;
    newRate = newRate.toFixed(2);
    await MainProductDataAccess.updateMainProductDB(prevComment.mainProductId, { rate: newRate });
  }
  let updatedComment = await CommentDataAccess.findByIdAndUpdate(_id, text, rate);
  return { results: 1, data: updatedComment };
};

exports.deleteOneCommentService = async function (_id) {
  let deletedComment = await CommentDataAccess.deleteOne(_id);
  return { results: 1, data: deletedComment };
};
