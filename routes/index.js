const taskRouter = require("./task.router");
const authenticateRouter = require("./authenticate.router");

function routes(app) {
  app.use("/tasks", taskRouter);
  app.use("/authenticate", authenticateRouter);
}

module.exports = routes;
