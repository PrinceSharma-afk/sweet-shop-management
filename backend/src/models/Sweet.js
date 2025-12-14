const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Sweet = sequelize.define('Sweet', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}, {
  tableName: 'sweets',  // explicitly define table name
  timestamps: true
});

module.exports = Sweet;
