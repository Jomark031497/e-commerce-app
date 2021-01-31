const Order = require("../models/order.model");
const Product = require("../models/product.model");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// DESC:    CREATE A NEW ORDER
// ROUTE:   /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderedItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderedItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// DESC:  GET SINGLE ORDER
// ROUTE: /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) next(new ErrorHandler("No order found with this id", 404));

  res.status(200).json({
    success: true,
    order,
  });
});

// DESC:  GET LOGGED IN USER ORDER
// ROUTE: /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// DESC:  GET ALL ORDERS
// ROUTE: /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// DESC:  UPDATE / PROCESS ORDERS (ADMIN)
// ROUTE: /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.findById(req.params.id);

  if (orders.orderStatus === "Delivered")
    return next(new ErrorHandler("you have already delivered this order", 400));

  orders.orderedItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  orders.orderStatus = req.body.orderStatus;
  orders.deliveredAt = Date.now();

  await orders.save();

  res.status(200).json({
    success: true,
    orders,
  });
});

// DESC:  DELETE ORDER
// ROUTE: /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) next(new ErrorHandler("No order found with this id", 404));

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save();
}
