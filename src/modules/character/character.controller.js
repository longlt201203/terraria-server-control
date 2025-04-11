const { Router } = require('express');
const { syncCharacters } = require('./character.service');

const CharacterController = Router();

CharacterController.get('/sync', async (req, res) => {
	await syncCharacters();
	res.redirect('/');
});

module.exports = CharacterController;
