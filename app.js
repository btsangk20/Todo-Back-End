// const http = require("http");
// const route = require("./routes/router");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const multer = require("multer");
const stoage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: stoage });

const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

const taskController = require("./controllers/task.controller");
const authenticateController = require("./controllers/authenticate.controller");
const authentication = require("./middlewares/authentication");
const parseRequestBody = require("./middlewares/parseRequestBody");

// const server = http.createServer((request, response) => {
//   response.statusCode = 200;
//   response.setHeader("Content-Type", "text/plain");

//   const router = route(request);
//   router(request, response);
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const server = express();

server.set("view engine", "ejs");

server.get("/upload", (request, response) => {
  response.render("upload");
});

server.post("/upload", upload.single("image"), (request, response) => {
  console.log(request.file);
  response.send("File uploaded");
});

server.get("/", (request, response) => {
  response.send("This is server");
});

server.get("/tasks", authentication, (request, response) => {
  const controller = taskController.getTask;
  controller(request, response);
});

server.get("/tasks/:id", authentication, (request, response) => {
  const controller = taskController.getTaskById;
  controller(request, response);
});

server.post("/tasks", authentication, parseRequestBody, (request, response) => {
  const controller = taskController.postTask;
  controller(request, response);
});

server.post('/authenticate/:id/upload', upload.single('image'), (request, response) => {
  const controller = authenticateController.UploadAvatar;
  controller(request, response);
})

server.patch(
  "/tasks/:id",
  authentication,
  parseRequestBody,
  (request, response) => {
    const controller = taskController.patchTask;
    controller(request, response);
  }
);

server.put(
  "/tasks/:id",
  authentication,
  parseRequestBody,
  (request, response) => {
    const controller = taskController.putTask;
    controller(request, response);
  }
);

server.delete("/tasks", authentication, (request, response) => {
  const controller = taskController.deleteAllTask;
  controller(request, response);
});

server.delete("/tasks/:id", authentication, (request, response) => {
  const controller = taskController.deleteTaskById;
  controller(request, response);
});

server.post("/authenticate/signin", parseRequestBody, (request, response) => {
  const controller = authenticateController.signIn;
  controller(request, response);
});

server.post("/authenticate/signup", parseRequestBody, (request, response) => {
  const controller = authenticateController.signUp;
  controller(request, response);
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
