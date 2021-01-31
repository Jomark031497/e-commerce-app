const express = require("express");
const router = express.Router();

const {
  newOrder,
  myOrders,
  getSingleOrder,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

/**
 * DESC :   CREATE A NEW ORDER
 * METHOD:  POST
 * ACCESS:  PRIVATE
 */
router.route("/order/new").post(isAuthenticated, newOrder);

/**
 * DESC :   GET SINGLE ORDER
 * METHOD:  GET
 * ACCESS:  PRIVATE
 */
router.route("/order/:id").get(isAuthenticated, getSingleOrder);

/**
 * DESC :   GET ALL LOGGED USER ORDERS
 * METHOD:  GET
 * ACCESS:  PRIVATE
 */
router.route("/orders/me").get(isAuthenticated, myOrders);

/**
 * DESC :   GET ALL ORDERS (ADMIN)
 * METHOD:  GET
 * ACCESS:  PRIVATE
 */
router
  .route("/admin/orders")
  .get(isAuthenticated, authorizeRoles("admin"), allOrders);

/**
 * DESC :   UPDATE/PROCESS ORDERS
 * METHOD:  PUT
 * ACCESS:  PRIVATE
 */
router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder);

/**
 * DESC :   DELETE ORDERS
 * METHOD:  DELETE
 * ACCESS:  PRIVATE
 */
router
  .route("/admin/order/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);

module.exports = router;
