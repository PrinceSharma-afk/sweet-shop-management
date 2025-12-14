// -------------------- DATABASE CONFIGURATION --------------------

// Import Sequelize ORM (used to manage SQL databases via JavaScript)
const { Sequelize } = require("sequelize");

// Load environment variables from .env file
// (DB credentials, environment type, etc.)
require("dotenv").config();

// Sequelize instance will be initialized conditionally
let sequelize;

// -------------------- TEST ENVIRONMENT --------------------
// When running automated tests (Jest, etc.),
// we use an in-memory SQLite database.
// This keeps tests fast, isolated, and prevents
// accidental writes to real databases.
if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:", // Database exists only during test execution
    logging: false,      // Disable SQL logs for cleaner test output
  });
} else {
  // -------------------- DEVELOPMENT / PRODUCTION --------------------
  // For local development and production,
  // we connect to a PostgreSQL database using
  // credentials stored securely in environment variables.
  sequelize = new Sequelize(
    process.env.DB_NAME,     // Database name
    process.env.DB_USER,     // Database username
    process.env.DB_PASSWORD,// Database password
    {
      host: process.env.DB_HOST, // Database host (localhost / cloud host)
      port: process.env.DB_PORT, // Database port (usually 5432)
      dialect: "postgres",       // Specify PostgreSQL dialect
      logging: false,            // Disable SQL logging in production
    }
  );
}

// Export the configured Sequelize instance
// This instance is reused across models and app initialization
module.exports = sequelize;
