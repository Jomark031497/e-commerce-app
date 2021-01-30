const express = require("express");
const errorMiddleware = require("./middlewares/errors");
const app = express();

app.use(express.json());

// import all routes
const products = require("./routes/product.routes");

app.use("/api/v1", products);

// Errorhandler middleware
app.use(errorMiddleware);

module.exports = app;
