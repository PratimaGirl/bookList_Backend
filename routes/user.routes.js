const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  getUser,
} = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/register", createUser);

router.post("/login", login);

router.get("/", verifyToken, getUser);

module.exports = router;
