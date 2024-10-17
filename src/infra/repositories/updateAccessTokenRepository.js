const MissingParamError = require("../../utils/errors/missingParamError");
const MongoHelper = require("./helpers/mongoHelper");

module.exports = class UpdateAccessTokenRepository {
  async update(userId, accessToken) {
    if (!userId) {
      throw new MissingParamError("userId");
    }
    if (!accessToken) {
      throw new MissingParamError("accessToken");
    }
    const userModel = await MongoHelper.getCollection("users");
    await userModel.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          accessToken,
        },
      }
    );
  }
};
