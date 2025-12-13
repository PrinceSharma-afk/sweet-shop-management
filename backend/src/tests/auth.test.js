const express = require('express');
const app = express();
app.use(express.json());

// Import auth routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

module.exports = app;
