const env = require("../common/env");
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect(env.MONGO_URL)
  .then(() => {
    console.log("Mongoose Connected");
  })
  .catch((error) => {
    console.error("connection error  ", error);
  });