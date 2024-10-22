// Middleware to protect routes based on role
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminOnly = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Admin Access denied" });
  }

  next();
};

module.exports = adminOnly;
