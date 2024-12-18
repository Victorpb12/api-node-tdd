const MongoHelper = require("./helpers/mongoHelper");
const MissingParamError = require("../../utils/errors/invalidParamError");
const LoadUSerByEmailRepository = require("./loadUserByEmailRepository");

let db;

const makeSut = () => {
  const userModel = db.collection("users");
  const sut = new LoadUSerByEmailRepository(userModel);
  return { userModel, sut };
};

describe("LoadUSerByEmail Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
    db = MongoHelper.db;
  });

  beforeEach(async () => {
    await db.collection("users").deleteMany();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test("Should return null if no user is found", async () => {
    const { sut } = makeSut();
    const user = await sut.load("invalid_email@gmail.com");
    expect(user).toBeNull();
  });

  test("Should return an user is found", async () => {
    const { userModel } = makeSut();
    await userModel.insertOne({
      _id: "user_id",
      email: "valid_email@gmail.com",
    });
    const mockUser = { _id: "user_id", email: "valid_email@gmail.com" };
    const insertedUser = await userModel.findOne({ _id: "user_id" });

    expect(insertedUser).toEqual(mockUser);
  });

  test("Should throw if no userModel is provided", async () => {
    const sut = new LoadUSerByEmailRepository();
    const promise = sut.load("any_email@gmail.com");
    expect(promise).rejects.toThrow();
  });

  test("Should throw if no email is provided", async () => {
    const { sut } = makeSut();
    const promise = sut.load();
    expect(promise).rejects.toThrow(new MissingParamError("email"));
  });
});
