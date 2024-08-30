const AuthUseCase = require("./authUseCase");

const { MissingParamError } = require("../../utils/errors");

const makeSut = () => {
  class LoadUserByEmailRepositorySpy {
    async load(email) {
      this.email = email;
      return this.user;
    }
  }

  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy);
  loadUserByEmailRepositorySpy.user = {};
  return {
    sut,
    loadUserByEmailRepositorySpy,
  };
};

describe("Auth UseCase", () => {
  test("Should throw if no email is provided", async () => {
    const { sut } = makeSut();
    const promise = sut.auth();

    expect(promise).rejects.toThrow(new MissingParamError("email"));
  });

  test("Should throw if no password is provided", async () => {
    const { sut } = makeSut();
    const promise = sut.auth("any_email@gmail.com");

    expect(promise).rejects.toThrow(new MissingParamError("password"));
  });

  test("Should call LoadUserByEmailRepository with correct email", async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    await sut.auth("any_email@gmail.com", "any_password");

    expect(loadUserByEmailRepositorySpy.email).toBe("any_email@gmail.com");
  });

  test("Should throw if no LoadUserByEmailRepository is provided", async () => {
    const sut = new AuthUseCase();
    const promise = sut.auth("any_email@gmail.com", "any_password");

    expect(promise).rejects.toThrow();
  });

  test("Should throw if LoadUserByEmailRepository has no load method", async () => {
    const sut = new AuthUseCase({});
    const promise = sut.auth("any_email@gmail.com", "any_password");

    expect(promise).rejects.toThrow();
  });

  test("Should return null if an invalid email is provided", async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    loadUserByEmailRepositorySpy.user = null;
    const accessToken = await sut.auth(
      "invalid_email@gmail.com",
      "any_password"
    );

    expect(accessToken).toBeNull();
  });

  test("Should return null if an invalid password is provided", async () => {
    const { sut } = makeSut();
    const accessToken = await sut.auth(
      "valid_email@gmail.com",
      "invalid_password"
    );

    expect(accessToken).toBeNull();
  });
});
