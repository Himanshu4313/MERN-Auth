const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;
const connectToDB = async () => {
  mongoose
    .connect(MONGODB_URL)
    .then((conn) => {
      console.log(`Database connect successfully with ${conn.connection.host}`);
    })
    .catch((e) => {
      console.log(e.message);
      process.exit(1);
    });
};
module.exports = connectToDB;
