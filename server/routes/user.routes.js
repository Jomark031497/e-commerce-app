const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/user.controller");

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

module.exports = router;
