// -------------------- TEST DATABASE SETUP --------------------

// Import Sequelize instance from models index
// Ensures tests use the same DB connection and models
const { sequelize } = require('../models');

/*
  beforeAll Hook

  Runs once before any test suite executes.

  Purpose:
  - Synchronizes all Sequelize models with the database
  - Uses `force: true` to drop and recreate tables
    ensuring a clean, predictable test environment
*/
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

/*
  afterAll Hook

  Runs once after all test suites complete.

  Purpose:
  - Gracefully closes the database connection
  - Prevents open handles that can cause Jest to hang
*/
afterAll(async () => {
  await sequelize.close();
});
