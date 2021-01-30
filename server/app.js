const express = require("express");
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

// import all routes
const products = require("./routes/product.routes");
const users = require("./routes/user.routes");

app.use("/api/v1", products);
app.use("/api/v1", users);

// Errorhandler middleware
app.use(errorMiddleware);

module.exports = app;
