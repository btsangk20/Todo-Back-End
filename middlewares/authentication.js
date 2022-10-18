const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const dotenv = require("dotenv");

dotenv.config();

function authentication(request, response, next) {
  try {
    if (!request.headers.authorization) {
      throw new Error("Invalid token.");
    }
    const token = request.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return User.findOne({
      username: decoded.username,
    }).then((user) => {
      if (!user) {
        throw new Error("Invalid token.");
      }
      next();
    });
  } catch (error) {
    response.end(JSON.stringify(error));
  }
}

module.exports = authentication;
