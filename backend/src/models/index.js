const sequelize = require('../config/db');

const User = require('./User');
const Sweet = require('./Sweet');

module.exports = {
  sequelize,
  User,
  Sweet,
};
