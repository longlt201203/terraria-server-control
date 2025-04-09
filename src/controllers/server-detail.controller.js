const { Router } = require("express");
const WorldModel = require("../db/models/world");
const { checkValidServer } = require("../middlewares");
const fs = require("fs");
const ServerModel = require("../db/models/server");

const ServerDetailController = Router();

ServerDetailController.get("/server/:serverId", checkValidServer(), async (req, res) => {
    const server = req.server;
    const worlds = await WorldModel.findAll({
        include: {
            model: ServerModel,
            required: false,
            where: {
                id: server.id
            }
        }
    })
    res.render("server-detail/index", { server: server.toJSON(), worlds: worlds.map(item => item.toJSON()) });
})

ServerDetailController.post("/server/:serverId/update-worlds-path", checkValidServer(), async (req, res) => {
    try {
        const server = req.server;
        server.set("worldsPath", req.body.worldsPath);
        await server.save();
        res.redirect(`/server/${server.id}`);
    } catch (err) {
        console.log(err);
        res.redirect(`/server/${server.id}?error=update_worlds_path_error`);
    }
})

ServerDetailController.post("/server/:serverId/update-characters-path", checkValidServer(), async (req, res) => {
    try {
        const server = req.server;
        server.charactersPath= req.body.charactersPath;
        await server.save();
        res.redirect(`/server/${server.id}`);
    } catch (err) {
        console.log(err);
        res.redirect(`/server/${server.id}?error=update_characters_path_error`);
    }
})

ServerDetailController.get("/server/:serverId/sync-worlds", checkValidServer(), async (req, res) => {
    const server = req.server;
    if (fs.existsSync(server.dataValues.worldsPath)) {
        const worlds = fs.readdirSync(server.dataValues.worldsPath).filter((w) => w.endsWith(".wld"));
        for (const world of worlds) {
            const worldName = world.split(".")[0];
            const worldData = await WorldModel.findOne({ where: { name: worldName } });
            if (!worldData) {
                await WorldModel.create({
                    name: worldName,
                    server: server.id,
                })
            }
        }
    } else {

    }
    res.redirect(`/server/${server.id}`);
})

ServerDetailController.post("/server/:serverId/create-world", checkValidServer(), async (req, res) => {
    const server = req.server;
    res.redirect(`/server/${server.id}`);
})

module.exports = ServerDetailController;