const { Router } = require('express');
const { syncWorlds, startWorld } = require('./world.service');
const checkWorld = require('./check-world.middleware');
const { startInstanceIfExists } = require('../instance/instance.service');

const WorldController = Router();

WorldController.get('/sync', async (req, res) => {
	await syncWorlds();
	res.redirect('/');
});

WorldController.get('/:worldId/start', checkWorld(), async (req, res) => {
	const world = req.world;
	const instance = await startInstanceIfExists(world);
	if (instance) {
		return res.redirect(`/instance/${instance.id}`);
	}
	res.render('world/start', { world });
});

WorldController.post('/:worldId/start', checkWorld(), async (req, res) => {
	const world = req.world;
	const instance = await startWorld(world, req.body);
	res.redirect(`/instance/${instance.id}`);
});

module.exports = WorldController;
