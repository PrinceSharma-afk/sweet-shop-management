// -------------------- MODELS INDEX --------------------

// Shared Sequelize database instance
// This ensures all models use the same DB connection
const sequelize = require('../config/db');

// Import individual models
// Each model defines a table and its schema
const User = require('./User');
const Sweet = require('./Sweet');

// Export a centralized models object
// This allows other parts of the application to:
// - Access the Sequelize instance
// - Access all registered models from a single place
module.exports = {
  sequelize,
  User,
  Sweet,
};
