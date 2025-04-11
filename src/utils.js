const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function generateRandomSecret(length = 32) {
	return crypto
		.randomBytes(Math.ceil(length / 2))
		.toString('hex')
		.slice(0, length);
}

const API_KEY = generateRandomSecret();
const JWT_SECRET = generateRandomSecret();

const ERROR_MESSAGES = {
	wrong_api_key: 'Wrong API key',
};

function signJwt(ip, device) {
	return jwt.sign({ ip, device }, JWT_SECRET, { expiresIn: '4h' });
}

function verifyJwt(ip, device, token) {
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		return decoded.ip === ip && decoded.device === device;
	} catch (err) {
		return false;
	}
}

module.exports = {
	generateRandomSecret,
	API_KEY,
	ERROR_MESSAGES,
	signJwt,
	verifyJwt,
};
