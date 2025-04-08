const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ModModel = sequelize.define("mod", {
  id: {
    field: "mod_id",
    type: DataTypes.INTEGER,
  },
});
