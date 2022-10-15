const taskRouter = require("./task.route");
const authenticateRouter = require("./authenticate.router");

const routes = {
  'tasks': taskRouter,
  'authenticate': authenticateRouter
};

module.exports = routes;
