const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || "authentication",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "authentication",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || "authentication",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    dialect: "mysql",
  },
};