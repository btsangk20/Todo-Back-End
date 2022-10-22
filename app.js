const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

const server = express();

server.use(bodyParser.json());

routes(server);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

mongoose.connect(
  "mongodb+srv://buitansang:Sang070502@test.m3rst4c.mongodb.net/test"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to database");
});
