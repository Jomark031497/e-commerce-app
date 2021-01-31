const express = require("express");
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

// import all routes
const products = require("./routes/product.routes");
const users = require("./routes/user.routes");
const orders = require("./routes/order.routes");

app.use("/api/v1", products);
app.use("/api/v1", users);
app.use("/api/v1", orders);

// Errorhandler middleware
app.use(errorMiddleware);

module.exports = app;
