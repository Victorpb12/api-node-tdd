const MissingParamError = require("../errors/missingParamError");

class LoadUSerByEmailRepository {
  async load(email) {
    return null
  }
}

const makeSut = () => {
  return new LoadUSerByEmailRepository();
};

describe("LoadUSerByEmail Repository", () => {
  test("Should return null if no user is found", async () => {
    const sut = makeSut();
    const user = await sut.load(email);
    expect(user).toBeNull();
  });
});
 