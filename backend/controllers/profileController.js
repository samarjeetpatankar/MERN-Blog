const User = require("../models/UserModel");
const Blog = require("../models/blogModel");

const getUserProfile = async (req, res) => {
  try {
    // Get user details
    const user = req.user; // The authenticated user from the middleware

    // Get blogs created by the user
    const userBlogs = await Blog.find({ username: user.username });

    // Return user details and blogs
    res.status(200).json({ user, blogs: userBlogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUserProfile };

