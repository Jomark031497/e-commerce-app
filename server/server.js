const app = require("./app");
const dotenv = require("dotenv");

// Setting up config file
dotenv.config({ path: "server/config/config.env" });

app.listen(process.env.PORT, () => {
  console.log(
    `server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
