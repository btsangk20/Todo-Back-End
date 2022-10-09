const taskController = require("../controllers/task.controller");

const taskRouter = {
  'GET': {
    middlewares: [],
    controller: taskController.getTask,
  },
  'POST': {
    middlewares: [],
    controller: taskController.postTask,
  },
  'GET/:id': {
    middlewares: [],
    controller: taskController.getTaskById,
  },
  'PUT/:id': {
    middlewares: [],
    controller: taskController.putTask,
  },
  'PATCH/:id': {
    middlewares: [],
    controller: taskController.patchTask,
  },
  'DELETE': {
    middlewares: [],
    controller: taskController.deleteAllTask,
  },
  'DELETE/:id': {
    middlewares: [],
    controller: taskController.deleteTaskById,
  }
};

module.exports = taskRouter;
