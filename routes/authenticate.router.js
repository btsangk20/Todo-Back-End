const authenticate = require("../controllers/authenticate.controller");
const parseRequestBody = require("../middlewares/parseRequestBody");

const authenticateRouter = {
  POST: {
    "signin": {
      middlewares: [parseRequestBody],
      controller: authenticate.signIn,
    },
    "signup": {
      middlewares: [parseRequestBody],
      controller: authenticate.signUp,
    },
  },
};

module.exports = authenticateRouter;
