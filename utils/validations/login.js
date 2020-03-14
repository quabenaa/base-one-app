const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateInput = (data) => {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.username)) {
    errors.username = "username is invalid";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "username field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports.validateInput = validateInput;
