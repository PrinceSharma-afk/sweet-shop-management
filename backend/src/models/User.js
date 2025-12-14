// -------------------- USER MODEL --------------------

// Import Sequelize data types
const { DataTypes } = require('sequelize');

// Shared Sequelize database instance
const sequelize = require('../config/db');

// Define the User model
// Represents an authenticated user of the application
const User = sequelize.define(
  'User',
  {
    // Unique username used for login and identification
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Prevent duplicate user accounts
    },

    // Hashed password (never store plain-text passwords)
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Role flag to control admin-level access
    // Used by authorization middleware
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Regular users by default
    },
  },
  {
    // Explicit table name for clarity and consistency
    tableName: 'users',

    // Automatically adds createdAt and updatedAt timestamps
    // Useful for auditing and user activity tracking
    timestamps: true,
  }
);

// Export User model for use in authentication and authorization logic
module.exports = User;
