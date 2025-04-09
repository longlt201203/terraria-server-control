require("dotenv").config()
const sqlize = require("./db/db");

sqlize
  .authenticate()
  .then(() => {
    require("./db/relations");

    sqlize.sync({ force: true });
  })