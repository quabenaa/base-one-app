require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load Input Validation
//const validateLoginInput = require("../../../utils/validations/login");
const User = require("../../../db/models/User");

/**
 * @route POST api/users/login
 * @desc  Login User / Returning
 * @access Public
 *
 */

router.post("/register", (req, res) => {
  let { firstname, lastname, username, email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      let error = "Email Address Exists in Database.";
      return res.status(400).json(error);
    } else {
      const newUser = new User({
        firstname,
        lastname,
        username,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }).then((user) => {
    if (!user) {
      let error = "No Account found";
      return res.status(404).json(error);
    }

    if (user.loggedIn) {
      let error = "User Already Logged In.";
      return res.status(404).json(error);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payloads = {
          id: user._id,
          username: user.username,
        };
        jwt.sign(
          payloads,
          process.env.SECRET,
          { expiresIn: 36000 },
          (err, token) => {
            if (err)
              res.status(500).json({ error: "Error signing token", raw: err });

            res.json({
              success: true,
              token: "JWT " + token,
              user,
            });
          }
        );
      } else {
        errors.password = "Password is incorrect";
        res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res
      .status(200)
      .send("Woow we are finally here BAAAAAAAAMMMMMMMMMMMMMMMMMMMMMMMMM");
  }
);

module.exports = router;
