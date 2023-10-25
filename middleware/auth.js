const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Authenticate user
exports.requireLogin = (req, res, next) => {
  if (req.headers.authorization) {
    // Get token from header
    const token = req.headers.authorization.split(" ")[1];
    // Verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // Attach token with request
    req.user = decode;
    next();
  } else {
    return res.status(400).json({ message: "Unauthorized" });
  }
};

// Admin middleware
exports.isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.role === 0) {
    return res.status(403).json({ error: "Restricted to admin only" });
  }
  next();
};
