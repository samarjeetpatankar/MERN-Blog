const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authUser = require("../middleware/authUser");

router.get("/", authUser, profileController.getUserProfile);

module.exports = router;
