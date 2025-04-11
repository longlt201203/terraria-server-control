const { Router } = require('express');
const AuthController = require('./modules/auth/auth.controller');
const ServerController = require('./modules/server/server.controller');
const WorldController = require('./modules/world/world.controller');
const CharacterController = require('./modules/character/character.controller');

const Controller = Router();

Controller.use(AuthController);
Controller.use(ServerController);
Controller.use('/world', WorldController);
Controller.use('/character', CharacterController);

module.exports = Controller;
