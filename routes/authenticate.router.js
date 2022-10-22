const authenticateController = require("../controllers/authenticate.controller");
const express = require("express");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const authenticateRouter = express.Router();

authenticateRouter.post("/:id/upload", upload.single('image'), (request, response) => {
  authenticateController.UploadAvatar(request, response);
});

authenticateRouter.post("/signin", (request, response) => {
  authenticateController.signIn(request, response);
});

authenticateRouter.post("/signup", (request, response) => {
  authenticateController.signUp(request, response);
});

module.exports = authenticateRouter;
