const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Controller = require("./controller");
const { API_KEY } = require("./utils");
const sequelize = require("./db/db");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(Controller);

sequelize
  .authenticate()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Login api key: ${API_KEY}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
