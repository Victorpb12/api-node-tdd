const validator = require("validator");
const MissingParamError = require("../errors/missingParamError");

class EmailValidator {
  isValid(email) {
    if (!email) {
      throw new MissingParamError("email");
    }

    return validator.isEmail(email);
  }
}

module.exports = EmailValidator;
