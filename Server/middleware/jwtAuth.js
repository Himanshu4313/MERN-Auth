const JWT = require("jsonwebtoken");

// middleware for check user have token or not
const jwtAuth = (req, res, next) => {
  const token = (req.cookies && req.cookies.token) || null;
  if (!token) {
    res.status(400).json({
      success: false,
      message: "Not Authorized user",
    });
  }
  try {
    const payload = JWT.verify(token, process.env.SECRET);
    req.user = { id: payload.id, email: payload.email };
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  next();
};

module.exports = jwtAuth;
