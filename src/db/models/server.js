const { DataTypes } = require("sequelize");
const sqlize = require("../db");

const ServerModel = sqlize.define("server", {
  id: {
    field: "server_id",
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    field: "name",
    type: DataTypes.STRING,
    allowNull: false,
  },
  ip: {
    field: "ip",
    type: DataTypes.STRING,
    allowNull: false,
  },
  worldsPath: {
    field: "world_path",
    type: DataTypes.STRING,
  },
  charactersPath: {
    field: "characters_path",
    type: DataTypes.STRING,
  }
});

module.exports = ServerModel;
