const ClientDataAccess = require("../dataAccess/client");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const Messages = require("../util/messages");
const { sha1, sha256 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
const sendEmail = require("../util/emailer");
const Config = require("../config");
//

exports.loginService = async function ({ email, password, __type }) {
  const clientWithEmail = await ClientDataAccess.getClientByEmailAndTypeDB(email, __type);

  if (isNull(clientWithEmail)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_DOES_NOT_EXIST);
  }

  if (!clientWithEmail.isVerified) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_EMAIL_IS_NOT_VERIFIED);
  }

  if (clientWithEmail.password !== sha256(password + "t2KB14o1")) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_EMAIL_AND_PASSWORD_DOES_NOT_MATCH);
  }

  let newClientToken = (
    await ClientTokenDataAccess.createClientTokenDB({
      tokenCode: Date.now() + sha1(clientWithEmail._id.toString() + Date.now()),
      client: clientWithEmail._id,
    })
  ).toObject();

  return {
    tokenCode: newClientToken.tokenCode,
  };
};

exports.verifyEmailService = async function ({ verifyEmailToken }) {
  const client = await ClientDataAccess.getClientByVerifyEmailTokenDB(verifyEmailToken);

  if (isNull(client)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_INSUFFICIENT_TOKEN);
  }

  updatedClient = await ClientDataAccess.updateClientDB(client._id, {
    isVerified: true,
    verifyEmailToken: undefined,
  });

  return {};
};

exports.changePasswordService = async function ({ client, oldPassword, newPassword }) {
  if (sha256(oldPassword + "t2KB14o1") !== client.password) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_PASSWORDS_DO_NOT_MATCH);
  }
  if (sha256(newPassword + "t2KB14o1") === client.password) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_INVALID_PASSWORD);
  }
  await ClientDataAccess.updateClientPasswordDB(client._id, sha256(newPassword + "t2KB14o1"));

  return {};
};

exports.forgotPasswordService = async function ({ email, __type }) {
  const clientWithEmail = await ClientDataAccess.getClientByEmailAndTypeDB(email, __type);

  if (isNull(clientWithEmail)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_DOES_NOT_EXIST);
  }

  if (!clientWithEmail.isVerified) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_EMAIL_IS_NOT_VERIFIED);
  }

  const resetPasswordToken = Date.now() + sha1(clientWithEmail._id.toString() + Date.now());
  await ClientDataAccess.updateClientResetPasswordTokenDB(clientWithEmail._id, resetPasswordToken);
  const resetURL = `http://${Config.frontendAddr}:${Config.frontendPort}/reset?token=${resetPasswordToken}`;

  try {
    await sendEmail({
      email,
      subject: "Reset Your Password",
      message: `You can follow the link ${resetURL} to reset your password.`,
    });
  } catch (error) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_SEND_EMAIL_FAILED);
  }

  return {};
};

exports.resetPasswordService = async function ({ resetPasswordToken, newPassword }) {
  const client = await ClientDataAccess.getClientByResetPasswordTokenDB(resetPasswordToken);

  if (isNull(client)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_INSUFFICIENT_TOKEN);
  }

  if (!isNull(client.googleID)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_REGISTERED_WITH_GOOGLE);
  }

  await ClientDataAccess.updateClientResetPasswordTokenDB(client._id, undefined);
  await ClientDataAccess.updateClientPasswordDB(client._id, sha256(newPassword + "t2KB14o1"));

  return {};
};
