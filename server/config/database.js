const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MDB_URI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((con) => {
      console.log(`connected to database: ${con.connection.host}`);
    });
};

module.exports = connectDatabase;
