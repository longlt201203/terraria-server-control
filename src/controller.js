const { Router } = require("express");
const { API_KEY, ERROR_MESSAGES, signJwt } = require("./utils");
const { checkAuth } = require("./middlewares");

const Controller = Router();

Controller.get("/", (req, res) => {
    res.render("index", { servers: [] });
});

Controller.get("/settings", (req, res) => {
   res.render("settings", { });
})

Controller.get("/login", (req, res) => {
    const { error } = req.query;
    res.render("login", { ...(error && ERROR_MESSAGES[error] && { error: ERROR_MESSAGES[error] }) });
});

Controller.post("/login", (req, res) => {
    const { apiKey } = req.body;

    if (apiKey === API_KEY) {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const device = req.headers['user-agent'];
        const token = signJwt(ip, device);
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/"); 
    } else {
        res.redirect("/login?error=wrong_api_key");
    }
})

module.exports = Controller;