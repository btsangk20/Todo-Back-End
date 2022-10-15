const User = require("../models/user.model");
const parseRequestBody = require("../middlewares/parseRequestBody");
const jwt = require("jsonwebtoken");

const userController = {
  signIn,
  signUp,
};

function signIn(request, response) {
  parseRequestBody(request, response)
    .then(() => {
      const { username, password } = request.body;
      User.findOne({ username, password }).then((user) => {
        if (!user) {
          response.end(JSON.stringify("Invalid username or password"));
        } else {
          const token = jwt.sign({ username, password }, "tujt31154Ng", {
            expiresIn: "1h",
          });
          response.end(JSON.stringify(token));
        }
      });
    })
    .catch((error) => {
      response.end(JSON.stringify(error));
    });
}

function signUp(request, response) {
  parseRequestBody(request, response)
    .then(() => {
      const { username, password } = request.body;
      User.findOne({ username }).then((user) => {
        if (user) {
          response.end(JSON.stringify({ error: "Username is exist" }));
        } else {
          const user = new User(request.body);
          user
            .save()
            .then((user) => {
              response.end(JSON.stringify(user));
            })
            .catch((error) => {
              response.end(JSON.stringify(error));
            });
        }
      });
    })
    .catch((error) => {
      response.end(JSON.stringify(error));
    });
}

module.exports = userController;
