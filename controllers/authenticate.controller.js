const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const userController = {
  signIn,
  signUp,
};

function signIn(request, response) {
  const { username, password } = request.body;

  User.findOne({ username }).then((user) => {
    if (!user) {
      response.end(JSON.stringify({ message: "Invalid username." }));
    }
    bcrypt.compare(password, user.password).then((result) => {
      if (!result) {
        response.end(JSON.stringify({ message: "Invalid password." }));
      }
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET
      );
      response.end(JSON.stringify({ token }));
    });
  });
}

function signUp(request, response) {
  const { username, password } = request.body;

  const hashPassword = bcrypt.hashSync(password, 10);

  User.findOne({ username }).then((user) => {
    if (user) {
      response.end(JSON.stringify({ error: "Username is exist" }));
    } else {
      const user = new User({username, password: hashPassword});
      user.save().then((user) => {
        response.end(JSON.stringify(user));
      });
    }
  });
}

module.exports = userController;
