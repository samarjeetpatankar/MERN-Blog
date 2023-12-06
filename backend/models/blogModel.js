const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  username: { type: String, required: true },
  categories: [{ type: String }],
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  tags: [{ type: String }],
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;


