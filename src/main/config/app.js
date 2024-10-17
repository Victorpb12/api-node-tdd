const express = require("express");
const app = express();
const setupApp = require("../config/setup");

setupApp(app);

module.exports = app;
