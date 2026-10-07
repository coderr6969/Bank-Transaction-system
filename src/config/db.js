const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database successfuly connected");
    })
    .catch((err) => {
      console.log("Database connection failed");
      process.exit(1);
    });
}

module.exports = connectToDB;
