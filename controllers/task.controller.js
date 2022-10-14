const Task = require("../models/task.model");
const parseRequestBody = require("../middlewares/parseRequestBody");

const taskController = {
  getTask,
  postTask,
  getTaskById,
  putTask,
  patchTask,
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
  // post task to database
  parseRequestBody(request, response)
    .then(() => {
      const task = new Task(request.body);
      task
        .save()
        .then((task) => {
          response.end(JSON.stringify(task));
        })
        .catch((error) => {
          response.end(JSON.stringify(error));
        });
    })
    .catch((error) => {
      response.end(JSON.stringify(error));
    });
}

function getTaskById(request, response) {
  // get task by id from database
  const id = request.url.split("/")[2];
  Task.findById(id)
    .then((task) => {
      response.end(JSON.stringify(task));
    })
    .catch((error) => {
      response.end(JSON.stringify(error));
    });
}

function putTask(request, response) {
  // replace task by id from database
  parseRequestBody(request, response)
    .then(() => {
      const id = request.url.split("/")[2];
      Task.findByIdAndUpdate(id, request.body, { new: true })
        .then((task) => {
          response.end(JSON.stringify(task));
        })
        .catch((error) => {
          response.end(JSON.stringify(error));
        });
    })
    .catch((error) => {
      response.end(JSON.stringify(error));
    });
}

function patchTask(request, response) {
  // update details name or status of task by id from database
  // const id = request.url.split("/")[2];
  // let task = "";
  // request.on("data", (chunk) => {
  //   task += chunk;
  // });
  // request.on("end", () => {
  //   if (JSON.parse(task).name) {
  //     Task.findByIdAndUpdate(id, { name: JSON.parse(task).name }, { new: true })
  //       .then((task) => {
  //         response.end(JSON.stringify(task));
  //       })
  //       .catch((error) => {
  //         response.end(JSON.stringify(error));
  //       });
  //   } else if (JSON.parse(task).status) {
  //     Task.findByIdAndUpdate(
  //       id,
  //       { status: JSON.parse(task).status },
  //       { new: true }
  //     )
  //       .then((task) => {
  //         response.end(JSON.stringify(task));
  //       })
  //       .catch((error) => {
  //         response.end(JSON.stringify(error));
  //       });
  //   }
  // });
  parseRequestBody(request, response).then(() => {
    const id = request.url.split("/")[2];
    Task.findByIdAndUpdate(id, request.body, { new: true })
      .then((task) => {
        response.end(JSON.stringify(task));
      })
      .catch((error) => {
        response.end(JSON.stringify(error));
      });
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
  const id = request.url.split("/")[2];
  Task.findByIdAndDelete(id)
    .then((task) => {
      response.end(JSON.stringify(task));
    })
    .catch((error) => {
      response.end(JSON.stringify(error));
    });
}

module.exports = taskController;
