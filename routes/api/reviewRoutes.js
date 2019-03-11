const router = require("express").Router();
const reviewController = require("../../controllers/reviewController");

//method for /api/review
router
.route("/")
.get(reviewController.getAllReviews)
.post(reviewController.createReview);

//method for /api/review/placeId
router
.route("/Byplace:placeId")
.get(reviewController.getReviewsByPlace);

// method for /api/review/user/:userId
router
  .route("/user/:userId")
  .get(reviewController.getReviewsByUser);

//method for /api/placeId
router
.route("/:id")
.get(reviewController.SelectReview)
.put(reviewController.updateReview)
.delete(reviewController.deleteReview);



module.exports = router;