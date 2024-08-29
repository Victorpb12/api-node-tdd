class UnauthorizedParamError extends Error {
  constructor(paramName) {
    super("Unauthorized");
    this.name = "Unauthorized";
  }
}

module.exports = UnauthorizedParamError;
