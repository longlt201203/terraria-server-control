const { Router } = require("express");
const { API_KEY, ERROR_MESSAGES, signJwt } = require("../utils");

const AuthController = Router();

AuthController.get("/login", (req, res) => {
    const { error } = req.query;
    const errorMsg = error && ERROR_MESSAGES[error];
    res.render("login", { error: errorMsg });
});

AuthController.post("/login", (req, res) => {
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

module.exports = AuthController;