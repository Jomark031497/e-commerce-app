const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");

/**
 * DESC :   REGISTER A USER
 * METHOD:  POST
 * ACCESS:  PUBLIC
 */
router.route("/register").post(registerUser);

/**
 * DESC :   LOGIN A USER
 * METHOD:  POST
 * ACCESS:  PUBLIC
 */
router.route("/login").post(loginUser);

/**
 * DESC :   LOGOUT A USER
 * METHOD:  GET
 * ACCESS:  PUBLIC
 */
router.route("/logout").get(logoutUser);

module.exports = router;
