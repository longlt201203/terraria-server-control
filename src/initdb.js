require('dotenv').config();
const sqlize = require('./db/db');

sqlize.authenticate().then(() => {
	require('./db/models');

	sqlize.sync({ force: true });
});
