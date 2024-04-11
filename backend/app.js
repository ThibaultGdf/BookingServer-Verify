var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const authenticate = require('./middlewares/authenticate.middleware.js');

require("dotenv").config();

var indexRouter = require("./routes/index.route");
const authRouter = require('./routes/authenticates.route.js');

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", authenticate.verifyJwt, indexRouter);
app.use('/auth', authRouter);

module.exports = app;
