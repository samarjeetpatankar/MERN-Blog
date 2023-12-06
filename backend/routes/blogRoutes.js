const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authUser = require("../middleware/authUser");
const multer = require("multer");

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

const upload = multer({ storage: storage });

// Use multer middleware for the "photo" field in the request
router.post("/create", upload.single("photo"), blogController.createBlog);
router.get("/all", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", authUser, blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
