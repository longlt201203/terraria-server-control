const { Router } = require("express");
const { checkAuth } = require("../middlewares");
const AuthController = require("./auth.controller");
const ServersController = require("./servers.controller");
const ServerDetailController = require("./server-detail.controller");

const Controller = Router();

Controller.use(AuthController);
Controller.use(ServersController);
Controller.use(ServerDetailController)

module.exports = Controller;