const Docker = require('dockerode');
const path = require('path');

const docker = new Docker();

docker.buildImage(
	{
		context: path.join(process.cwd(), 'terraria-docker'),
		src: ['Dockerfile'],
	},
	{
		t: 'terraria-docker',
	},
	function (err, response) {
		if (err) {
			console.log(err);
		} else {
			docker.modem.followProgress(
				response,
				(err, result) => {},
				(obj) => {
					process.stdout.write(obj.stream || '');
				},
			);
		}
	},
);

module.exports = docker;
