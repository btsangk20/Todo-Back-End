const http = require("http");
const route = require("./routes/router");
const mongoose = require("mongoose");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/plain");

  const router = route(request);
  router(request, response);
});


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

