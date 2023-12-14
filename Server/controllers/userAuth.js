const emailValidation = require("email-validator");
const userModel = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
exports.signUp = async (req, res) => {
  const { name, userName, email, password, bio } = req.body;
  //check all fields are avilable or not
  if (!name || !userName || !email || !password || !bio) {
    return res.status(400).json({
      success: false,
      message: "All fields are mandatory",
    });
  }
  //check emailvalidation
  const validEmail = await emailValidation.validate(email);
  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "please enter valid email address.",
    });
  }
  try {
    const userData = await userModel.create({
      name,
      userName,
      email,
      password,
      bio,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: userData,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          "This email id is already exists into database that your providing",
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logIn = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(401).json({
      success: false,
      message: "All field are required",
    });
  }
  try {
    const user = await userModel.findOne({ userName }).select("+password");
    if (!userName || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = user.generateJwtToken();
    this.password = undefined;
    // const userWithoutPassword = {
    //    ...user,
    //    password : undefined,
    // };

    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    res.cookie("token", token, cookieOption);
    res.status(201).json({
      success: true,
      message: "login successfully",
      data: user,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

//getInfo

exports.getInfo = async (req, res) => {
  const userId = req.user.id;
  try {
    const userInfo = await userModel.findById(userId);
    return res.status(201).json({
      success: true,
      data: userInfo,
    });
  } catch (e) {
    res.status(501).json({
      success: false,
      message: e.message,
    });
  }
};

//logout

exports.logout = (req, res) => {
  try {
    const cookieOption = {
      expires: new Date(),
      httpOnly: true,
    };
    res.cookie("token", null, cookieOption);
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
