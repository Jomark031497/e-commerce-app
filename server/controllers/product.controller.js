const Product = require("../models/product.model");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// DESC:  CREATE A NEW PRODUCT
// ROUTE: /api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({ success: true, product });
});

// DESC:  GET ALL PRODUCTS
// ROUTE: /api/v1/products/
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 10;
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeatures.query;
  res
    .status(200)
    .json({ success: true, count: products.length, productCount, products });
});

// DESC:  GET SINGLE PRODUCT
// ROUTE: /api/v1/products/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  res.status(200).json({ success: true, product });
});

// DESC:  UPDATE PRODUCT
// ROUTE: /api/v1/products/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, product });
});

// DESC:  DELETE PRODUCT
// ROUTE: /api/v1/products/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  await product.remove();

  res
    .status(200)
    .json({ success: true, message: "Product successfully deleted" });
});
