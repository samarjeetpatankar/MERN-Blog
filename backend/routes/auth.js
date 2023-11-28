const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("User not found!");
    }
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }
    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET,
      { expiresIn: "3d" }
    );
    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGOUT
router.get("/logout", async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// REFETCH USER
router.get("/refetch", async (req, res) => {
  try {
    // Retrieve the token from the cookie
    const token = req.cookies.token;

    // Check if the token is not present
    if (!token) {
      return res.status(401).json("Unauthorized");
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Find the user using the decoded token information
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(404).json("User not found!");
    }

    // Exclude the password field from the user object
    const { password, ...userInfo } = user._doc;

    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

 

module.exports = router; 

