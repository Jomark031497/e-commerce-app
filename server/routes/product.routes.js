const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
} = require("../controllers/product.controller");

router.route("/products").get(getProducts);

router.route("/products/new").post(newProduct);

module.exports = router;
