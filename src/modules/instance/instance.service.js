const { InstanceModel, WorldModel } = require('../../db/models');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const docker = require('../../docker');

const TEMPLATE_SERVER_CONFIG_TXT_PATH = 'tml-templates/serverconfig.txt.ejs';
const INSTANCES_FOLDER_PATH = 'instances';

exports.createInstance = async (world, dto) => {
	return await InstanceModel.create({
		...dto,
		world_id: world.id,
	});
};

const createNewInstanceTemplate = async (instance) => {
	const instancePath = path.join(INSTANCES_FOLDER_PATH, String(instance.id));
	fs.mkdirSync(path.join(instancePath, 'data'), { recursive: true });
	const serverConfigTxt = await ejs.renderFile(
		TEMPLATE_SERVER_CONFIG_TXT_PATH,
		{ instance },
	);
	fs.writeFileSync(
		path.join(instancePath, 'data', 'serverconfig.txt'),
		serverConfigTxt,
	);
};

const initInstanceTemplate = async (instance) => {
	const instancePath = path.join(INSTANCES_FOLDER_PATH, String(instance.id));
	if (!fs.existsSync(instancePath)) createNewInstanceTemplate(instance);
};

const createDockerInstance = (instance) => {
	const instancePath = path.join(INSTANCES_FOLDER_PATH, String(instance.id));
	const imageName = 'longthanhle1122/terraria-docker';
	const containerName = `tml-${instance.id}`;

	docker.createContainer(
		{
			Image: imageName,
			name: containerName,
			Tty: true,
			OpenStdin: true,
			HostConfig: {
				RestartPolicy: {
					Name: 'unless-stopped',
				},
				PortBindings: {
					[`${String(instance.port)}/tcp`]: [
						{
							HostPort: '7777',
						},
					],
				},
				Binds: [
					`${path.join(instancePath, 'data')}:/root/.local/share/Terraria/tModLoader`,
				],
				NetworkMode: 'bridge',
			},
		},
		(error, result) => {
			if (error) {
				console.log(error);
			} else {
				console.log('Container ID:', result.id);
			}
		},
	);
};

exports.startInstance = async (instanceOrInstanceId) => {
	const instance =
		typeof instanceOrInstanceId === 'number'
			? await InstanceModel.findByPk(instanceOrInstanceId, {
					include: [{ model: WorldModel, as: 'world' }],
				})
			: instanceOrInstanceId;
	await initInstanceTemplate(instance);
	createDockerInstance(instance);
};

exports.startInstanceIfExists = async (world) => {
	const instance = await InstanceModel.findOne({
		where: {
			world_id: world.id,
		},
		include: [
			{
				model: WorldModel,
				as: 'world',
			},
		],
	});
	if (instance) {
		this.startInstance(instance);
	}
	return instance;
};

const cleanUpInstanceFolder = (instance) => {
	const instancePath = path.join(INSTANCES_FOLDER_PATH, String(instance.id));
	fs.rmSync(instancePath, { recursive: true, force: true });
};

exports.deleteInstance = async (instance) => {
	cleanUpInstanceFolder(instance);
	await InstanceModel.destroy({
		where: {
			id: instance.id,
		},
	});
};
