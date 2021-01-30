const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { isAuthenticated } = require("../middlewares/auth");

/**
 * DESC :   GET ALL PRODUCTS
 * METHOD:  GET
 * ACCESS:  PUBLIC
 */
router.route("/products").get(getProducts);

/**
 * DESC :   GET SINGLE PRODUCT
 * METHOD:  GET
 * ACCESS:  PUBLIC
 */
router.route("/products/:id").get(getSingleProduct);

/**
 * DESC :   CREATE NEW PRODUCT
 * METHOD:  POST
 * ACCESS:  PRIVATE
 */
router.route("/products/new").post(isAuthenticated, newProduct);

/**
 * DESC :   UPDATE A PRODUCT
 * METHOD:  PUT
 * ACCESS:  PRIVATE
 */
router.route("/products/:id").put(isAuthenticated, updateProduct);

/**
 * DESC :   DELETE A PRODUCT
 * METHOD:  DELETE
 * ACCESS:  PRIVATE
 */
router.route("/products/:id").delete(isAuthenticated, deleteProduct);

module.exports = router;
