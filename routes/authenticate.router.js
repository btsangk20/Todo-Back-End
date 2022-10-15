const authenticate = require("../controllers/authenticate.controller");

const authenticateRouter = {
  POST: {
    "signin": {
      middlewares: [],
      controller: authenticate.signIn,
    },
    "signup": {
      middlewares: [],
      controller: authenticate.signUp,
    },
  },
};

module.exports = authenticateRouter;
