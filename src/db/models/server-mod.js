const { DataTypes } = require("sequelize");
const sqlize = require("../db");

const ServerModModel = sqlize.define("server_mod", {
  id: {
    field: "server_mod_id",
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = ServerModModel;
