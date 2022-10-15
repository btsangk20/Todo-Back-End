const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const userController = {
  signIn,
  signUp,
};

function signIn(request, response) {
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
}

function signUp(request, response) {
  const { username, password } = request.body;
  User.findOne({ username }).then((user) => {
    if (user) {
      response.end(JSON.stringify({ error: "Username is exist" }));
    } else {
      const user = new User(request.body);
      user.save().then((user) => {
        response.end(JSON.stringify(user));
      });
    }
  });
}

module.exports = userController;
