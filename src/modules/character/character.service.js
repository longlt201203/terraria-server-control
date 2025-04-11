const { CharacterModel } = require('../../db/models');
const { getServerInfo } = require('../server/server.service');
const fs = require('fs');

exports.syncCharacters = async () => {
	const { charactersPath } = getServerInfo();

	if (!(charactersPath && fs.existsSync(charactersPath))) {
		return;
	}

	const listCharactersFiles = fs.readdirSync(charactersPath).filter((item) => {
		const parts = item.split('.');
		return parts[parts.length - 1] == 'plr';
	});
	const promises = listCharactersFiles.map(async (filename) => {
		const filenameWithoutExt = filename.split('.')[0];
		const character = await CharacterModel.findOne({
			where: {
				name: filenameWithoutExt,
			},
		});
		if (character) {
			return;
		}
		await CharacterModel.create({
			name: filenameWithoutExt,
		});
	});

	await Promise.all(promises);
};

exports.listCharacters = async () => {
	return await CharacterModel.findAll();
};
