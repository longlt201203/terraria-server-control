const { DataTypes } = require("sequelize");
const sqlize = require("../db");

const WorldModel = sqlize.define("world", {
  id: {
    field: "world_id",
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    field: "name",
    type: DataTypes.STRING,
    allowNull: false,
  },
  port: {
    field: "port",
    type: DataTypes.INTEGER,
  },
  status: {
    field: "status",
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = WorldModel;
