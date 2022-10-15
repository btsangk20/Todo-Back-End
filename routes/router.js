const router = require("../routes/index");

const getRouter = (request) => {
  const url = request.url;
  const method = request.method;
  const endpoint = url.split("/")[1];
  const id = url.split("/")[2];
  if (endpoint === "authenticate") {
    return router[endpoint][method][id].controller;
  } else {
    if (id) {
      return router[endpoint][method + "/:id"].controller;
    }
    return router[endpoint][method].controller;
  }
};

module.exports = getRouter;
