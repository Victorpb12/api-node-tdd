const MissingParamError = require("../../utils/errors/missingParamError");
const { MongoClient } = require("mongodb");

let client, db;

class LoadUSerByEmailRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async load(email) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}

const makeSut = () => {
  const userModel = db.collection("users");
  const sut = new LoadUSerByEmailRepository(userModel);
  return { userModel, sut };
};

describe("LoadUSerByEmail Repository", () => {
  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL);
    db = client.db();
  });

  beforeEach(async () => {
    await db.collection("users").deleteMany();
  });

  afterAll(async () => {
    await client.close();
  });

  test("Should return null if no user is found", async () => {
    const { sut } = makeSut();
    const user = await sut.load("invalid_email@gmail.com");
    expect(user).toBeNull();
  });

  test("Should return an user is found", async () => {
    const { sut, userModel } = makeSut();
    await userModel.insertOne({ email: "valid_email@gmail.com" });
    const user = await sut.load("valid_email@gmail.com");
    expect(user.email).toBe("valid_email@gmail.com");
  });
});
