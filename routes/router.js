const router = require("../routes/index");

const getRouter = (request) => {
  const url = request.url;
  const method = request.method;
  const endpoint = url.split("/")[1];
  const id = url.split("/")[2];
  let currentRouteData = router[endpoint][method];
  if (id) {
    currentRouteData = router[endpoint][method + "/:id"];
  }
  if (router[endpoint] && router[endpoint][method]) {
    if (endpoint === "authenticate") {
      currentRouteData = router[endpoint][method][id];
    }
    if (
      currentRouteData.middlewares &&
      currentRouteData.middlewares.length > 0
    ) {
      return function controller(req, res) {
        try {
          let promise = currentRouteData.middlewares[0](req, res);
          currentRouteData.middlewares.forEach((middleware, index) => {
            if (index > 0) {
              promise.then(() => middleware(req, res));
            }
          });
          promise.then(() => currentRouteData.controller(req, res));
          return promise;
        } catch (error) {
          return error;
        }
      };
    }
    return currentRouteData.controller;
  }
};

module.exports = getRouter;
