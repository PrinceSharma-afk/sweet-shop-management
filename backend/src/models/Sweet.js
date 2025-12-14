// -------------------- SWEET MODEL --------------------

// Import Sequelize data types
const { DataTypes } = require("sequelize");

// Shared Sequelize database instance
const sequelize = require("../config/db");

// Define the Sweet model
// This model represents a single sweet item in the inventory
const Sweet = sequelize.define(
  "Sweet",
  {
    // Name of the sweet
    // Must be unique to avoid duplicate inventory entries
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    // Category used for grouping and filtering sweets
    // Defaults to "General" if not explicitly provided
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "General",
    },

    // Price of the sweet
    // Must be a non-negative value
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0, // Prevent negative pricing
      },
    },

    // Quantity available in inventory
    // Represents current stock level
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // New sweets start with zero stock unless restocked
      validate: {
        min: 0, // Prevent negative inventory values
      },
    },
  },
  {
    // Explicit table name in database
    // Prevents Sequelize from pluralizing automatically
    tableName: "sweets",

    // Automatically adds createdAt and updatedAt timestamps
    // Useful for auditing and tracking changes
    timestamps: true,
  }
);

// Export Sweet model for use across controllers and services
module.exports = Sweet;
