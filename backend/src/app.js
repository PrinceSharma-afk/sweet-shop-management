const express = require('express');
const { registerUser } = require('./controllers/authController');

const app = express();
app.use(express.json());

app.post('/auth/register', registerUser);

module.exports = app;
