const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
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

/**
 * DESC :   FORGOT PASSWORD
 * METHOD:  POST
 * ACCESS:  PUBLIC
 */
router.route("/password/forgot").post(forgotPassword);

/**
 * DESC :   RESET PASSWORD
 * METHOD:  PUT
 * ACCESS:  PUBLIC
 */
router.route("/password/reset/:token").put(resetPassword);

/**
 * DESC :   GET USER PROFILE
 * METHOD:  GET
 * ACCESS:  PRIVATE
 */
router.route("/me").get(isAuthenticated, getUserProfile);

/**
 * DESC :   UPDATE PASSWORD
 * METHOD:  PUT
 * ACCESS:  PRIVATE
 */
router.route("/password/update").put(isAuthenticated, updatePassword);

module.exports = router;
