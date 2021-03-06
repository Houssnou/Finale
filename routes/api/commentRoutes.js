const router = require("express").Router();
const CommentController = require("../../controllers/commentController");

//method for /api/Comment
router
.route("/")
.get(CommentController.getAllComments)
.post(CommentController.createComment);

//method for /api/Comment/reviewId
router
.route("/:reviewId")
.get(CommentController.getAllCommentsByReview);

//method for /api/comments
router
.route("/:id")
.put(CommentController.updateComment)
.delete(CommentController.deleteComment);

//method for /api/comments/user/:userId
router
  .route("/user/:userId")
  .get(CommentController.getCommentsByUser);

module.exports = router;