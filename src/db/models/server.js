const { DataTypes } = require("sequelize");

const ServerModel = sequelize.define("server", {
  id: {
    field: "server_id",
    type: DataTypes.STRING,
    primaryKey: true,
  },
  ip: {
    field: "ip",
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ServerModel;
