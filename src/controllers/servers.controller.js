const { Router } = require("express");
const ServerModel = require("../db/models/server");

const ServersController = Router()

ServersController.get("/", async (req, res) => {
    const servers = await ServerModel.findAll()
    res.render("servers/index", { servers: servers.map(item => item.toJSON()) });
});

ServersController.post("/create-server", async (req, res) => {
    try {
        await ServerModel.create(req.body);
        res.redirect("/")
    } catch (err) {
        console.log(err)
        res.redirect("/?error=create_server_error")
    }
})

ServersController.post("/manage-server", (req, res) => {
    const data = req.body;

    switch (data.operation) {
        case "view":
            res.redirect(`/server/${data.id}`);
            break;
        case "edit":
            handleEditServer(req, res);
            break;
        case "delete":
            handleDeleteServer(req, res);
            break;
        default:
            res.redirect("/?error=unknown_operation")
    }
})

async function handleEditServer(req, res) {
    try {
        await ServerModel.update(req.body, {
            where: {
                id: req.body.id
            }
        })
        res.redirect("/")
    } catch (err) {
        console.log(err)
        res.redirect("/?error=edit_server_error")
    }
}

async function handleDeleteServer(req, res) {
    try {
        await ServerModel.destroy({
            where: {
                id: req.body.id
            }
        })
        res.redirect("/")
    } catch (err) {
        console.log(err)
        res.redirect("/?error=delete_server_error")
    }
}

module.exports = ServersController;