const { Router } = require('express');
const { syncWorlds } = require('./world.service');

const WorldController = Router();

WorldController.get('/sync', async (req, res) => {
	await syncWorlds();
	res.redirect('/');
});

module.exports = WorldController;
