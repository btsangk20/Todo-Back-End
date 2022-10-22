const Task = require("../models/task.model");

const taskController = {
  getTask,
  postTask,
  getTaskById,
  updateTask,
  deleteAllTask,
  deleteTaskById,
};

function getTask(request, response) {
  Task.find()
    .then((tasks) => {
      response.end(JSON.stringify(tasks));
    })
    .catch((error) => {
      response.end(JSON.stringify(error));
    });
}

function postTask(request, response) {
  const task = new Task(request.body);
  task
    .save()
    .then((task) => {
      response.end(JSON.stringify(task));
    })
    .catch((error) => {
      response.end(JSON.stringify(error));
    });
}

function getTaskById(request, response) {
  const id = request.params.id;
  Task.findById(id)
    .then((task) => {
      response.end(JSON.stringify(task));
    })
    .catch((error) => {
      response.end(JSON.stringify(error));
    });
}

function updateTask(request, response) {
  // replace task by id from database
  const id = request.params.id;
  Task.findByIdAndUpdate(id, request.body, { new: true })
    .then((task) => {
      response.end(JSON.stringify(task));
    })
    .catch((error) => {
      response.end(JSON.stringify(error));
    });
}

function deleteAllTask(request, response) {
  // delete all task from database
  Task.deleteMany()
    .then((task) => {
      response.end(JSON.stringify(task));
    })
    .catch((error) => {
      response.end(JSON.stringify(error));
    });
}

function deleteTaskById(request, response) {
  const id = request.params.id;
  Task.findByIdAndDelete(id)
    .then((task) => {
      response.end(JSON.stringify(task));
    })
    .catch((error) => {
      response.end(JSON.stringify(error));
    });
}

module.exports = taskController;
