const LoginRouter = require("../../presentation/routers/loginRouter");
const AuthUseCase = require("../../domain/useCases/authUseCase");
const EmailValidator = require("../../utils/helpers/emailValidator");

module.exports = (router) => {
  const emailValidator = new EmailValidator();
  const authUseCase = new AuthUseCase();
  const loginRouter = LoginRouter(authUseCase, emailValidator);
  router.post("/login", loginRouter);
};
