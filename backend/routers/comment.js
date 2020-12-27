const express = require("express");
const RequestHelper = require("./../util/requestHelper");
const authController = require("../controllers/authClient");
const CommentController = require("../controllers/comment");
const router = express.Router();

router.use(authController.protectRoute);

router
  .route("/:pid")
  .get(CommentController.getCommentsController, RequestHelper.returnResponse)
  .post(CommentController.createOneCommentController, RequestHelper.returnResponse)
  .patch(CommentController.updateOneCommentController, RequestHelper.returnResponse)
  .delete(CommentController.deleteOneCommentController, RequestHelper.returnResponse);

router.get("/:pid/all", CommentController.getAllCommentsController, RequestHelper.returnResponse);

module.exports = router;
