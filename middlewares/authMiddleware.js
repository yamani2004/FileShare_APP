const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.id).select("-password");

    next(); // Continue to actual route

  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
