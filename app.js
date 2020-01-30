require("./models/db");
const path = require("path");
const exphbs = require("express-handlebars");
const express = require("express");
const bodyParser = require("body-parser");

const employeeController = require("./controllers/employeeController");

const app = express();

app.set("views", path.join(__dirname, "/views/"));
// app.set("views", __dirname + "/views/");
// app.use(express.static("./views/"));
// app.use("/public", express.static(path.join(__dirname, "public")));
// app.use("views", express.static(path.join(__dirname, "/views")));

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/"
  })
);
app.set("view engine", "hbs");

//body-parser middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/employee", employeeController);

const port = process.env.PORT || 2050;

app.listen(port, () => {
  console.log("App Running on port: " + port);
});
