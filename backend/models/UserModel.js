const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_picture: { type: String, default: "default_profile_picture.jpg" },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
