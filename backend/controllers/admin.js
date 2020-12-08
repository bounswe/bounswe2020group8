const AdminService = require("../services/admin");

exports.loginController = BaseUtil.createController((req) => {
  let { email, password } = req.query;

  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      AdminService.loginService({
        email,
        password,
      })
    );
});

exports.logoutController = BaseUtil.createController((req) => {
  return BB.all([])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() =>
      AdminService.logoutService({
        tokenCode: req.tokenCode,
      })
    );
});
