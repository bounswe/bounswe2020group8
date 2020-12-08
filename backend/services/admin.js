const AdminDataAccess = require("../dataAccess/admin");
const AdminTokenDataAccess = require("../dataAccess/adminToken");

exports.loginService = async function ({ email, password }) {
  const adminWithEmail = await AdminDataAccess.getAdminByEmailDB(email);

  if (isNull(adminWithEmail)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_DOES_NOT_EXIST);
  }

  if (adminWithEmail.password !== password) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_EMAIL_AND_PASSWORD_DOES_NOT_MATCH);
  }

  let newAdminToken = (
    await AdminTokenDataAccess.createAdminTokenDB({
      tokenCode: Date.now() + sha1(adminWithEmail._id.toString() + Date.now()),
      client: adminWithEmail._id,
    })
  ).toObject();

  return {
    tokenCode: newAdminToken.tokenCode,
  };
};

exports.logoutService = async function ({ tokenCode }) {
  try {
    await AdminTokenDataAccess.removeAdminTokenDB(tokenCode);
  } catch {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_NO_CLIENT_ASSOCIATED_WITH_TOKEN);
  }

  return {};
};
