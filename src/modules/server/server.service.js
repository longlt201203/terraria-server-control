const os = require('os');
const fs = require('fs');

const SERVER_JSON_PATH = 'server.json';

function getSystemIp() {
	const interfaces = os.networkInterfaces();
	for (const name in interfaces) {
		for (const iface of interfaces[name]) {
			if (iface.family === 'IPv4' && !iface.internal) {
				return iface.address; // Return the first external IPv4 address
			}
		}
	}
	return '127.0.0.1';
}

function initServerInfo() {
	let server = {
		ip: getSystemIp(),
		worldsPath: '',
		charactersPath: '',
	};

	if (!fs.existsSync(SERVER_JSON_PATH)) {
		fs.writeFileSync(SERVER_JSON_PATH, JSON.stringify(server, null, 2));
	} else {
		server = JSON.parse(fs.readFileSync(SERVER_JSON_PATH));
	}

	return server;
}

let server = initServerInfo();

function writeServerToFile() {
	fs.writeFileSync(SERVER_JSON_PATH, JSON.stringify(server, null, 2));
}

exports.getServerInfo = () => server;
exports.updateServerWorldsPath = (worldPaths) => {
	server.worldsPath = worldPaths;
	writeServerToFile();
};
exports.updateServerCharactersPath = (charactersPath) => {
	server.charactersPath = charactersPath;
	writeServerToFile();
};
