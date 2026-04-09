const express = require("express");
const {
  saveProperty,
  removeSavedProperty,
  getSavedProperties,
  checkSavedProperty,
} = require("../controllers/savedPropertyController");

const router = express.Router();

router.post("/", saveProperty);
router.get("/:userId", getSavedProperties);
router.get("/:userId/:propertyId", checkSavedProperty);
router.delete("/:userId/:propertyId", removeSavedProperty);

module.exports = router;