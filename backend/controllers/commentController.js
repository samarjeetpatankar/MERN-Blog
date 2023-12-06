const Comment = require("../models/commentModel");

const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const newComment = new Comment({
      content,
      username: req.user.username,
      blogId: req.params.blogId,
    });
    await newComment.save();
    res
      .status(201)
      .json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the authenticated user is the creator of the comment
    if (comment.username !== req.user.username) {
      return res.status(403).json({ error: "You are not authorized to update this comment" });
    }

    // Update the comment
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    );

    res.status(200).json({ message: "Comment updated successfully", comment: updatedComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the authenticated user is the creator of the comment
    if (comment.username !== req.user.username) {
      return res.status(403).json({ error: "You are not authorized to delete this comment" });
    }

    // Delete the comment
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);

    res.status(200).json({ message: "Comment deleted successfully", comment: deletedComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
 

