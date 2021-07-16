const sequelize = require("sequelize");

const db = new sequelize("db_uas", "root", "", {
  dialect: "mysql"
});

db.sync({});

module.exports = db;