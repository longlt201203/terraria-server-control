const ServerModel = require("./db/models/server");
const { verifyJwt } = require("./utils");

function checkAuth() {
    return (req, res, next) => {
        const { token } = req.cookies;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const device = req.headers['user-agent'];
        if (verifyJwt(ip, device, token)) {
            next();
        } else {
            res.redirect("/login?error=invalid_token");
        }
    }
}

function checkValidServer() {
    return async (req, res, next) => {
        const { serverId } = req.params;
        const server = await ServerModel.findByPk(serverId);
        if (server) {
            req.server = server;
            next();
        } else {
            res.status(404).send()
        }
    }
}

module.exports = {
    checkAuth ,
    checkValidServer
}