const MongoHelper = require("../infra/helpers/mongoHelper");
const env = require("./config/env");

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const app = require("./config/app");
    app.listen(5858, () => console.log("Server started on port 5858"));
  })
  .catch(console.error);
