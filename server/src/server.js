const express = require("express");
require("dotenv").config();
const productRoute = require("./routes/productRoute");

const app = express();

app.use(express.json());

app.use("/api/v1", productRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `listening to port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
