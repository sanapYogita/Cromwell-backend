const express = require("express");
const router = express.Router();
const userController = require("../src/controllers/userController.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/details", isAuthenticated, userController.getUserDetails);

module.exports = router;
