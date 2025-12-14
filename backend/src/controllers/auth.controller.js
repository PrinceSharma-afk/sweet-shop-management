// -------------------- DEPENDENCIES --------------------

// bcrypt is used to securely hash passwords before storing them in the database
const bcrypt = require('bcryptjs');

// jsonwebtoken is used to create and verify JWT tokens for authentication
const jwt = require('jsonwebtoken');

// Sequelize User model representing the users table
const User = require('../models/User');

// Load environment variables (JWT_SECRET, etc.)
require('dotenv').config();

// -------------------- REGISTER CONTROLLER --------------------
// Handles user registration (signup)
exports.register = async (req, res) => {
  // Extract expected fields from request body
  const { username, password, isAdmin } = req.body;

  // Validate username: must exist and not be empty/whitespace
  if (!username || username.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid username' });
  }

  // Validate password: basic length check (can be strengthened later)
  if (!password || password.length < 4) {
    return res.status(400).json({ error: 'Password too short' });
  }

  try {
    // Check if a user with the same username already exists
    // Prevents duplicate accounts
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving it
    // Salt rounds = 10 (industry standard balance between security & performance)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in the database
    // !!isAdmin ensures the value is strictly boolean
    const user = await User.create({
      username,
      password: hashedPassword,
      isAdmin: !!isAdmin
    });

    // Send minimal user info back (never send password)
    res.status(201).json({
      message: 'User registered',
      user: {
        username: user.username,
        isAdmin: user.isAdmin
      }
    });

  } catch (err) {
    // Catch any unexpected server/database errors
    res.status(500).json({ error: 'Server error' });
  }
};

// -------------------- LOGIN CONTROLLER --------------------
// Handles user authentication (signin)
exports.login = async (req, res) => {
  // Extract credentials from request body
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });

    // If user does not exist, return generic error (security best practice)
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare plain password with hashed password stored in DB
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, deny access
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    // Payload contains only essential, non-sensitive user info
    const token = jwt.sign(
      {
        username: user.username,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET, // Secret key from .env
      { expiresIn: '1h' }      // Token expires in 1 hour
    );

    // Send token and role info to frontend
    // Frontend will store token and attach it to future requests
    res.status(200).json({
      token,
      isAdmin: user.isAdmin
    });

  } catch (err) {
    // Handle unexpected errors
    res.status(500).json({ error: 'Server error' });
  }
};
