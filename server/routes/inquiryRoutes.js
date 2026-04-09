const express = require("express");
const {
  createInquiry,
  getInquiriesByUser,
  getInquiriesByProperty,
} = require("../controllers/inquiryController");

const router = express.Router();

router.post("/", createInquiry);
router.get("/user/:userId", getInquiriesByUser);
router.get("/property/:propertyId", getInquiriesByProperty);

module.exports = router;