const { Router } = require('express');
const {
	getServerInfo,
	updateServerWorldsPath,
	updateServerCharactersPath,
} = require('./server.service');
const { listWorlds } = require('../world/world.service');
const { listCharacters } = require('../character/character.service');

const ServerController = Router();

ServerController.get('/', async (req, res) => {
	const server = getServerInfo();
	const [worlds, characters] = await Promise.all([
		listWorlds(),
		listCharacters(),
	]);

	res.render('index', { server, worlds, characters });
});

ServerController.post('/server/update-worlds-path', (req, res) => {
	updateServerWorldsPath(req.body.worldsPath);
	res.redirect('/');
});

ServerController.post('/server/update-characters-path', (req, res) => {
	updateServerCharactersPath(req.body.charactersPath);
	res.redirect('/');
});

module.exports = ServerController;
