const { InstanceModel, WorldModel } = require('../../db/models');

const checkInstance = () => async (req, res, next) => {
	const { instanceId } = req.params;
	if (!instanceId) {
		return res.status(404).send();
	}
	const instance = await InstanceModel.findByPk(instanceId, {
		include: [
			{
				model: WorldModel,
				as: 'world',
			},
		],
	});
	if (!instance) {
		return res.status(404).send();
	}
	req.instance = instance;
	next();
};

module.exports = checkInstance;
