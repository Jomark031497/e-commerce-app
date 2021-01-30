const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
} = require("../controllers/product.controller");

/**
 * DESC :   GET ALL PRODUCTS
 * METHOD:  GET
 * ACCESS:  PUBLIC
 */
router.route("/products").get(getProducts);

/**
 * DESC :   CREATE NEW PRODUCT
 * METHOD:  POST
 * ACCESS:  PRIVATE
 */
router.route("/products/new").post(newProduct);

module.exports = router;
