// src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

// Verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// Verify admin (temporary in-memory check)
exports.verifyAdmin = (req, res, next) => {
  // For simplicity, username 'admin' is treated as admin
  if (req.user?.username === 'admin') return next();
  res.status(403).json({ error: 'Admin access required.' });
};
