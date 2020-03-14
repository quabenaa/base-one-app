const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const color = require("../utils/utils");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(color.success("*** MongoDB Connected ***"));
  } catch (err) {
    console.error(color.failed(`MongoDB Connection Failed : ${err.message}`));
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
