const express = require("express");
const { signUp, logIn, getInfo, logout } = require("../controllers/userAuth");
const jwtAuth = require("../middleware/jwtAuth");
const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", logIn);
authRoutes.get("/user", jwtAuth, getInfo);
authRoutes.get("/logout", jwtAuth, logout);

module.exports = authRoutes;
