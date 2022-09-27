var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const routeApi = require("./routes/routes");
require("dotenv").config();

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
var cors = require("cors");
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const http = require("http");
const server = http.createServer(app);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.get("/", (req, res) => {
  return res.send({
    message: "welcome222",
  });
});

app.use("/api", routeApi);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

var socketApi = require("./socket/socketApi");
var io = socketApi.io;
io.attach(server, {
  cors: {
    origin: "http://localhost:3000",
  },
  upgrade: false,
  transports: ["websocket", "polling"],
});

var mongoose = require("mongoose");
var { DB_HOST, DB_PORT, DB_NAME } = process.env;

mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
  .then(() => {
    server.listen(3300, () => {
      console.log("Url api start at > http://localhost:" + 3300);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = io;
