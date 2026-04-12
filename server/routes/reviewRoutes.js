const express = require("express");
const {
  getReviewsByProperty,
  getReviewSummary,
  createReview,
  deleteReview,
} = require("../controllers/reviewController");

const router = express.Router({ mergeParams: true });

router.get("/", getReviewsByProperty);
router.get("/summary", getReviewSummary);
router.post("/", createReview);
router.delete("/:reviewId", deleteReview);

module.exports = router;