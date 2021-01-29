const router = require("express").Router();

const { getProducts } = require("../controllers/productController");

router.get("/products", getProducts);

module.exports = router;
