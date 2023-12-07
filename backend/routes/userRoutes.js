const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authUser = require("../middleware/authUser");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/details", authUser, userController.getUserDetails);

module.exports = router;
 
