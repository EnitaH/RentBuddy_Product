const express = require('express');
const {
  getReviewsByProperty,
  getReviewSummary,
  createReview,
} = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router.get('/', getReviewsByProperty);
router.get('/summary', getReviewSummary);
router.post('/', createReview);

module.exports = router;