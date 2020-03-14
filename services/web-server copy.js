require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const color = require("../utils/utils");
const connectDB = require("../db/connect");

//Import routes
const users = require("../routes/api/users/users");

const log = console.log;

const initialize = () => {
  //Connect Database
  connectDB();

  const app = express();

  // Body parser middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());
  require("../middleware/auth")(passport);

  /**
   * Routes for the api
   */
  //Users Route
  app.use("/api/users", users);

  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

  // error handler middleware
  app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "Internal Server Error",
      },
    });
  });

  //Start Server
  app.listen(process.env.PORT, () => {
    log(color.success("*** Server has STARTED ***"));
    log(color.success(`*** PORT : ${process.env.PORT} ***`));
  });
};

module.exports.initialize = initialize;
