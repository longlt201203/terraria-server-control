const { DataTypes } = require("sequelize");
const sqlize = require("../db");

const CharacterModel = sqlize.define("character", {
  id: {
    field: "character_id",
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    field: "name",
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CharacterModel;
