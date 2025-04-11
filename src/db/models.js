const { DataTypes } = require('sequelize');
const sqlize = require('./db');

const CharacterModel = sqlize.define('characters', {
	id: {
		field: 'character_id',
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		field: 'name',
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const WorldModel = sqlize.define('worlds', {
	id: {
		field: 'world_id',
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		field: 'name',
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const InstanceModel = sqlize.define('instances', {
	id: {
		field: 'instance_id',
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	port: {
		field: 'port',
		type: DataTypes.INTEGER,
	},
	status: {
		field: 'status',
		type: DataTypes.TINYINT,
		defaultValue: 0,
	},
});

const ModModel = sqlize.define('mod', {
	id: {
		field: 'mod_id',
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		field: 'name',
		type: DataTypes.STRING,
	},
});

const WorldModModel = sqlize.define('world_mod', {
	id: {
		field: 'world_mod_id',
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
});

WorldModel.hasOne(InstanceModel, {
	foreignKey: 'world_id',
});
InstanceModel.belongsTo(WorldModel, {
	foreignKey: 'world_id',
});

WorldModel.hasMany(WorldModModel, {
	foreignKey: 'world_id',
});
WorldModModel.belongsTo(WorldModel, {
	foreignKey: 'world_id',
});

ModModel.hasMany(WorldModModel, {
	foreignKey: 'mod_id',
});
WorldModModel.belongsTo(ModModel, {
	foreignKey: 'mod_id',
});

module.exports = {
	CharacterModel,
	WorldModel,
	ModModel,
	WorldModModel,
	InstanceModel,
};
