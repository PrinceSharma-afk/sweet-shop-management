// -------------------- AUTH ROUTES --------------------

// Express router for handling authentication-related endpoints
const express = require('express');

// Import authentication controller methods
// - register: handles user signup
// - login: handles user signin and token generation
const { register, login } = require('../controllers/auth.controller');

// Initialize router instance
const router = express.Router();

/* =========================
   AUTHENTICATION ENDPOINTS

   POST /register
   - Registers a new user
   - Validates input
   - Hashes password
   - Stores user in database

   POST /login
   - Authenticates user credentials
   - Generates JWT token on success
========================= */

// User registration endpoint
router.post('/register', register);

// User login endpoint
router.post('/login', login);

// Export router to be mounted in main app
module.exports = router;
