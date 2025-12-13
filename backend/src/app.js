const express = require('express');
const { register, login } = require('./controllers/auth.controller');
const { getAllSweets, searchSweets, createSweet } = require('./controllers/sweet.controller');

const app = express();
app.use(express.json());

// Auth routes
app.post('/auth/register', register);
app.post('/auth/login', login);

// Sweet routes
app.get('/sweets', getAllSweets);
app.get('/sweets/search', searchSweets); // separate route for search
app.post('/sweets', createSweet);

module.exports = app;
