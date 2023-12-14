require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/connectDB");
const cors = require("cors");
const cookiesParser = require("cookie-parser");
const authRoutes = require("./routes/userAuth");
const app = express();
//connect to db
connectToDB();

//express middleware
app.use(express.json()); //third party middleware
app.use(express.urlencoded({ extended: true })); //third party middleware

//cors
//third party middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

//cookies-parser
app.use(cookiesParser()); //third party middleware

// all auth routes here
app.use("/api/auth", authRoutes);
//home routes
app.use("/", (req, res) => {
  res.status(200).json({ message: "Instagram Authentication" });
});
module.exports = app;
