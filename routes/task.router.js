const taskController = require("../controllers/task.controller");
const authentication = require("../middlewares/authentication");
const express = require("express");

const taskRouter = express.Router();

taskRouter.get("/", authentication, (request, response) => {
  taskController.getTask(request, response);
});

taskRouter.get("/:id", authentication, (request, response) => {
  taskController.getTaskById(request, response);
});

taskRouter.post("/", authentication, (request, response) => {
  taskController.postTask(request, response);
});

taskRouter.patch("/:id", authentication, (request, response) => {
  taskController.updateTask(request, response);
});

taskRouter.put("/:id", authentication, (request, response) => {
  taskController.updateTask(request, response);
});

taskRouter.delete("/", authentication, (request, response) => {
  taskController.deleteAllTask(request, response);
});

taskRouter.delete("/:id", authentication, (request, response) => {
  taskController.deleteTaskById(request, response);
});

module.exports = taskRouter;
