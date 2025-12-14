// src/middleware/auth.middleware.js
// -------------------- AUTHENTICATION & AUTHORIZATION MIDDLEWARE --------------------

// jsonwebtoken is used to verify and decode JWTs sent by the client
const jwt = require('jsonwebtoken');

/* =========================
   VERIFY JWT TOKEN

   Authentication middleware that protects routes by
   validating the JWT provided by the client.

   Expected request header:
   Authorization: Bearer <JWT_TOKEN>

   On success:
   - Token is verified for integrity and expiry
   - Decoded user data is attached to req.user
   - Request continues to the next middleware/controller

   On failure:
   - Request is blocked with 401 Unauthorized
========================= */
exports.verifyToken = (req, res, next) => {
  // Extract JWT from Authorization header
  const token = req.headers['authorization']?.split(' ')[1];

  // Block request if token is missing
  if (!token) {
    return res
      .status(401)
      .json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify token using secret key (checks signature + expiry)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded payload to request
    // Makes user info available to all downstream middleware/routes
    req.user = decoded;

    // Allow request to proceed
    next();
  } catch (err) {
    // Token is invalid, expired, or tampered with
    res.status(401).json({ error: 'Invalid token.' });
  }
};

/* =========================
   VERIFY ADMIN ACCESS

   Authorization middleware to restrict access
   to admin-only routes.

   Assumes verifyToken middleware has already run.

   Access is granted if:
   - req.user exists
   - req.user.isAdmin === true
========================= */
exports.verifyAdmin = (req, res, next) => {
  // Check admin privilege from decoded token payload
  if (req.user?.isAdmin) {
    return next();
  }

  // User is authenticated but not authorized
  return res.status(403).json({ error: 'Admin access required.' });
};
