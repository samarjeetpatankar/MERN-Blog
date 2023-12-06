const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/create", blogController.createBlog);
router.get("/all", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
