const fs = require('fs');
const { getServerInfo } = require('../server/server.service');
const { WorldModel } = require('../../db/models');

exports.listWorlds = async () => {
	return await WorldModel.findAll();
};

exports.syncWorlds = async () => {
	const { worldsPath } = getServerInfo();

	if (!(worldsPath && fs.existsSync(worldsPath))) {
		return;
	}

	const listWorldFiles = fs.readdirSync(worldsPath).filter((item) => {
		const parts = item.split('.');
		return parts[parts.length - 1] == 'wld';
	});
	const promises = listWorldFiles.map(async (filename) => {
		const filenameWithoutExt = filename.split('.')[0];
		const world = await WorldModel.findOne({
			where: {
				name: filenameWithoutExt,
			},
		});
		if (world) {
			return;
		}
		await WorldModel.create({
			name: filenameWithoutExt,
		});
	});

	await Promise.all(promises);
};
