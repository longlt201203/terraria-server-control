const CharacterModel = require("./models/character");
const ModModel = require("./models/mod");
const ServerModel = require("./models/server");
const ServerModModel = require("./models/server-mod");
const WorldModel = require("./models/world");
const WorldModModel = require("./models/world-mod");

ServerModel.hasMany(CharacterModel, {
    foreignKey: "server_id",
});
CharacterModel.belongsTo(ServerModel, {
    foreignKey: "server_id"
});

ServerModel.hasMany(WorldModel, {
    foreignKey: "server_id",
});
WorldModel.belongsTo(ServerModel, {
    foreignKey: "server_id"
});

ServerModel.hasMany(ServerModModel, {
    foreignKey: "server_id",
});
ServerModModel.belongsTo(ServerModel, {
    foreignKey: "server_id"
});

ModModel.hasMany(ServerModModel, {
    foreignKey: "mod_id",
});
ServerModModel.belongsTo(ModModel, {
    foreignKey: "mod_id",
});

WorldModel.hasMany(WorldModModel, {
    foreignKey: "world_id",
});
WorldModModel.belongsTo(WorldModel, {
    foreignKey: "world_id",
});

ModModel.hasMany(WorldModModel, {
    foreignKey: "mod_id",
});
WorldModModel.belongsTo(ModModel, {
    foreignKey: "mod_id",
});