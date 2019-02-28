const router = require("express").Router();
const CommentController = require("../../controllers/CommentController");

//method for /api/Comment
router
.route("/")
.get(CommentController.getAllComments)
.post(CommentController.createComment);

//method for /api/Comment/reviewId
router
.route("/:reviewId")
.get(CommentController.getAllCommentsByReview);

//method for /api/placeId
router
.route("/:id")
.delete(CommentController.deleteComment);

module.exports = router;