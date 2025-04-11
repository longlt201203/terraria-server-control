const { WorldModel } = require('../../db/models');

const checkWorld = () => async (req, res, next) => {
	const { worldId } = req.params;
	if (!worldId) {
		return res.status(404).send();
	}
	const world = await WorldModel.findByPk(worldId);
	if (!world) {
		return res.status(404).send();
	}
	req.world = world;
	next();
};

module.exports = checkWorld;
