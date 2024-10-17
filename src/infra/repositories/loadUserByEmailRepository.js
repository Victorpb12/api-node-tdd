const MissingParamError = require("../../utils/errors/invalidParamError");

class LoadUSerByEmailRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async load(email) {
    if (!email) {
      throw new MissingParamError("email");
    }
    const user = await this.userModel.findOne({ email });
    return user;
  }
}

module.exports = LoadUSerByEmailRepository;
