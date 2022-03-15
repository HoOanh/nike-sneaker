const path = require("path");

//Initialization express;
const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = 3000;

const cors = require("cors");
let bodyParser = require("body-parser");

app.use(cors());

// body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const route = require("./routers");

// Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "resources", "views"));

// Static file
app.use(express.static(path.join(__dirname, "./public")));

// Router init
route(app);

app.listen(port, () => console.log(`App is running on port ${port}`));
