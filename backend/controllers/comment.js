const BaseUtil = require("../util/baseUtil");
const BB = require("bluebird");
const CommentService = require("../services/comment");
const AppValidator = require("../util/appValidator");

exports.getCommentsController = BaseUtil.createController((req) => {
  let productId = req.params.pid;
  let customerId = req.client._id;
  return BB.all([]).then(() => CommentService.getCommentsService(productId, customerId));
});

exports.getAllCommentsController = BaseUtil.createController((req) => {
  let productId = req.params.pid;
  return BB.all([]).then(() => CommentService.getAlCommentsService(productId));
});

exports.createOneCommentController = BaseUtil.createController((req) => {
  let mainProductId = req.params.pid;
  let customerId = req.client._id;
  let name = req.client.name;
  let lastName = req.client.lastName;
  let { text, rate } = req.body;
  return BB.all([AppValidator.isValidRange(0, 5, rate).reflect()]).then(() =>
    CommentService.createOneCommentService(mainProductId, customerId, text, rate, name, lastName)
  );
});

exports.updateOneCommentController = BaseUtil.createController((req) => {
  let { _id, text } = req.body;
  return BB.all([]).then(() => CommentService.updateOneCommentService(_id, text));
});

exports.deleteOneCommentController = BaseUtil.createController((req) => {
  let { _id } = req.body;
  return BB.all([]).then(() => CommentService.deleteOneCommentService(_id));
});
