const express = require('express');
const app = express();

app.use(express.json());

// Temporary /auth/register route for first green test
app.post('/auth/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || username.length === 0) {
    return res.status(400).json({ error: 'Invalid username' });
  }
  res.status(201).json({ message: 'User registered' });
});

module.exports = app;
