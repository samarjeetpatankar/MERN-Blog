const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

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

app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("App is running on port " + process.env.PORT);
});
