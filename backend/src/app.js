const express = require('express');
const sequelize = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

// Routes
const authRoutes = require('./routes/auth.routes');
const sweetRoutes = require('./routes/sweet.routes');
const inventoryRoutes = require('./routes/inventory.routes');

const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(express.json());

// -------------------- ROUTES --------------------
app.use('/auth', authRoutes);
app.use('/sweets', sweetRoutes);
app.use('/inventory', inventoryRoutes);

// -------------------- TEST DB CONNECTION --------------------
if (process.env.NODE_ENV !== 'test') {
  sequelize.authenticate()
    .then(() => console.log('PostgreSQL connected'))
    .catch(err => console.error('DB connection error:', err));

  // -------------------- SYNC DATABASE --------------------
  sequelize.sync({ alter: true })
    .then(() => console.log('DB synced'))
    .catch(err => console.error('DB sync error:', err));
}

// -------------------- HEALTH CHECK --------------------
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Sweet Shop API running' });
});

module.exports = app;
