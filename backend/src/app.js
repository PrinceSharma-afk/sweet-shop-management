const express = require('express');
const { register, login } = require('./controllers/auth.controller');

const app = express();
app.use(express.json());

app.post('/auth/register', register);
app.post('/auth/login', login);

module.exports = app;
