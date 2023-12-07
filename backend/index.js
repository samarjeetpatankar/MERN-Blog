const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors middleware
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const profileRoutes = require("./routes/profileRoutes");

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is connected successfully!");
  } catch (err) {
    console.log(err);
  }
};

app.use(express.json());
app.use(cors()); // Use cors middleware before defining routes

app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.use("/comment", commentRoutes);
app.use("/profile", profileRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("App is running on port " + process.env.PORT);
});
