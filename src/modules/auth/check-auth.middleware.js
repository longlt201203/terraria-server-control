const { verifyJwt } = require('./utils');

const checkAuth = () => {
	return (req, res, next) => {
		const { token } = req.cookies;
		const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
		const device = req.headers['user-agent'];
		if (verifyJwt(ip, device, token)) {
			next();
		} else {
			res.redirect('/login?error=invalid_token');
		}
	};
};

module.exports = checkAuth;
