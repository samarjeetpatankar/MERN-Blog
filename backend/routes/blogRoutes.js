const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authUser = require("../middleware/authUser");

router.post("/create", authUser, blogController.createBlog);
router.get("/all", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", authUser, blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
