const bcrypt = require("bcrypt");

class Encrypter {
  async compare(value, hash) {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}

describe("Encryper", () => {
  test("Should return true if bcrypt returns true", async () => {
    const sut = new Encrypter();
    const isValid = await sut.compare("value", "hash");
    expect(isValid).toBe(true);
  });

  test("Should return true if bcrypt returns false", async () => {
    const sut = new Encrypter();
    bcrypt.isValid = false;
    const isValid = await sut.compare("value", "hash");
    expect(isValid).toBe(false);
  });
});