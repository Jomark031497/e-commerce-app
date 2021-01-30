const Product = require("../models/product.model");

// DESC:  CREATE A NEW PRODUCT
// ROUTE: /api/v1/product/new
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({ success: true, product });
};

exports.getProducts = (req, res, next) => {
  res.status(200).json({ success: true, message: "this route is working" });
};
