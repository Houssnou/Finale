const router = require("express").Router();
const reviewController = require("../../controllers/reviewController");

//method for /api/review
router
.route("/")
.get(reviewController.getAllReviews)
.post(reviewController.createReview);

//method for /api/review/placeId
router
.route("/:placeId")
.get(reviewController.getReviewsByPlace);

//method for /api/placeId
router
.route("/:id")
.delete(reviewController.deleteReview);

module.exports = router;