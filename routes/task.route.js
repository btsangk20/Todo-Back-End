const taskController = require("../controllers/task.controller");
const parseRequestBody = require("../middlewares/parseRequestBody");
const authentication = require("../middlewares/authentication");

const taskRouter = {
  GET: {
    middlewares: [authentication],
    controller: taskController.getTask,
  },
  POST: {
    middlewares: [authentication, parseRequestBody],
    controller: taskController.postTask,
  },
  "GET/:id": {
    middlewares: [authentication],
    controller: taskController.getTaskById,
  },
  "PUT/:id": {
    middlewares: [authentication, parseRequestBody],
    controller: taskController.putTask,
  },
  "PATCH/:id": {
    middlewares: [authentication, parseRequestBody],
    controller: taskController.patchTask,
  },
  DELETE: {
    middlewares: [authentication],
    controller: taskController.deleteAllTask,
  },
  "DELETE/:id": {
    middlewares: [authentication],
    controller: taskController.deleteTaskById,
  },
};

module.exports = taskRouter;
