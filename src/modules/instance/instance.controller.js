const { Router } = require('express');
const checkInstance = require('./check-instance.middleware');
const { INSTANCE_STATUS } = require('./instance.constants');
const { deleteInstance } = require('./instance.service');

const InstanceController = Router();

InstanceController.get('/:instanceId', checkInstance(), (req, res) => {
	const instance = req.instance;

	res.render('instance/index', {
		instance: {
			...instance.toJSON(),
			status: INSTANCE_STATUS[instance.status],
		},
	});
});

InstanceController.get(
	'/:instanceId/delete',
	checkInstance(),
	async (req, res) => {
		const instance = req.instance;
		await deleteInstance(instance);
		res.redirect('/');
	},
);

module.exports = InstanceController;
