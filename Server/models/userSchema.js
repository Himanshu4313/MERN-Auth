const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      maxLength: [20, "name should at least 20 char"],
      minLength: [5, "name should be minimum 5 char"],
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "userName is required"],
      unique: [true, "This userName is not avilable"],
      trim: true,
      minLength: [7, "username must be 7 char"],
      maxLength: [20, "username should only contain 20 char"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "this email id has been already registered"],
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    bio: {
      type: String,
      required: [true, "This field is required."],
    },
    forgotPasswordToken: { type: String },
    forgotPasswordExpiryDate: { type: Date },
  },
  { timestamps: true }
);

//pre-middleware for Hash password before saving in database
userSchema.pre("save", async function (next) {
  //if password is not modified then not hash it
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

//json web token is generate here when user can sigup
userSchema.methods = {
  generateJwtToken() {
    try {
      return JWT.sign(
        { id: this._id, userName: this.userName },
        process.env.SECRET,
        {
          expiresIn: "24h",
        }
      );
    } catch (error) {
      throw new Error("Failed to generating JWT token");
    }
  },
};
const userModel = mongoose.model("InstaUser", userSchema);
module.exports = userModel;
