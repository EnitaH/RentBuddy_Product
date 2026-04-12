const express = require("express");
const { updateUser, updatePassword } = require("../controllers/userController");

const router = express.Router();

router.put("/:id", updateUser);
router.put("/:id/password", updatePassword);

module.exports = router;