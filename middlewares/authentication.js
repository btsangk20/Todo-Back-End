const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

function authentication(request, response) {
  try {
    if (!request.headers.authorization) {
      throw new Error("Invalid token.");
    }
    const token = request.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "tujt31154Ng");

    return User.findOne({
      username: decoded.username,
      password: decoded.password,
    }).then((user) => {
      if (!user) {
        throw new Error("Invalid token.");
      }
      return user;
    });
  } catch (error) {
    return error;
  }
}

module.exports = authentication;
