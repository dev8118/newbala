const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require('dotenv')
const app = express();
const route = require("./routes");
const database = require("./utils/database");

dotenv.config()
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1", route);

app.get("/categories/*", (req, res) => {
  res.sendFile(__dirname + "/public/categories/[id]/index.html");
});
app.get("/posts/*", (req, res) => {
  res.sendFile(__dirname + "/public/posts/[id]/index.html");
})
app.use(function (req, res, next) {
  res.sendFile(__dirname + "/public/404/index.html");
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});
database.connect();

module.exports = app;
