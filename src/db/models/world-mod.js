const { DataTypes } = require("sequelize");
const sqlize = require("../db");

const WorldModModel = sqlize.define("world_mod", {
  id: {
    field: "world_mod_id",
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = WorldModModel;
