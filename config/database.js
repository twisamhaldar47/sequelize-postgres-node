const { Sequelize } = require("sequelize");
//db connection config
const db = new Sequelize("codegig-traversymedia", "postgres", "4747", {
  host: "localhost",
  dialect: "postgres"
});

module.exports = db;
