const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authUser = require("../middleware/authUser");

router.post("/:blogId/create", authUser, commentController.createComment);
router.get("/:blogId/all", commentController.getAllComments);
router.get("/:commentId", commentController.getCommentById);
router.put("/:commentId", authUser, commentController.updateComment);
router.delete("/:commentId", authUser, commentController.deleteComment);

module.exports = router;
  
