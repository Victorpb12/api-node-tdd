const MissingParamError = require("./missingParamError");
const UnauthorizedError = require("./unauthorizedError");

class HttpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }

  static serverError() {
    return { statusCode: 500 };
  }

  static unauthorizedError() {
    return { statusCode: 401, body: new UnauthorizedError() };
  }

  static Ok() {
    return { statusCode: 200 };
  }
}

module.exports = HttpResponse;
