const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.NODE_ENV === "test") {
  // TEST DB (SQLite - in memory)
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
} else {
  // DEV / PROD DB (PostgreSQL)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
      logging: false,
    }
  );
}

module.exports = sequelize;
