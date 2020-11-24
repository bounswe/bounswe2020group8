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
exports.initService = async function ({ token }) {
  await ClientTokenDataAccess.removeClientTokenDB(token._id);

  const newClientToken = (
    await ClientTokenDataAccess.createClientTokenDB({
      tokenCode: Date.now() + sha1(token.client._id.toString() + Date.now()),
      client: token.client._id,
    })
  ).toObject();

  return Formatters.formatClientToken({ ...newClientToken, client: token.client });
};

exports.loginService = async function ({ email, password, type }) {
  const clientWithEmail = await ClientDataAccess.getClientByEmailAndTypeDB(email, type);

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

  return Formatters.formatClientToken({ ...newClientToken, client: clientWithEmail });
};

async function createTokenAndFormat(client) {
  let newClientToken = (
    await ClientTokenDataAccess.createClientTokenDB({
      tokenCode: Date.now() + sha1(client._id.toString() + Date.now()),
      client: client._id,
    })
  ).toObject();

  return Formatters.formatClientToken({ ...newClientToken, client });
}

exports.signupService = async function ({ email, password, type, name, lastName }) {
  const clientWithEmail = await ClientDataAccess.getClientByEmailAndTypeDB(email, type);

  if (!isNull(clientWithEmail)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_IS_ALREADY_REGISTERED);
  }

  const encryptedPassword = sha256(password + "t2KB14o1");
  const newClient = (
    await ClientDataAccess.createClientDB({
      email,
      password: encryptedPassword,
      type,
      name,
      lastName,
    })
  ).toObject();

  const verifyEmailToken = Date.now() + sha1(newClient._id.toString() + Date.now());
  const updatedClient = await ClientDataAccess.updateClientVerifyEmailTokenDB(
    newClient._id,
    verifyEmailToken
  );

  const resetURL = `http://${Config.hostAddr}:${Config.port}/client/verifyEmail?verifyEmailToken=${verifyEmailToken}`;

  try {
    await sendEmail({
      email,
      subject: "Email verification",
      message: `You can follow the link ${resetURL} to finish sign up process.`,
    });
  } catch (error) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_SEND_EMAIL_FAILED);
  }

  return {
    returnMessage: "Verification email sent!",
    client: Formatters.formatClient(updatedClient),
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

  return {
    returnMessage: "Client is now verified!",
    client: Formatters.formatClient(updatedClient),
  };
};

exports.changePasswordService = async function ({ token, newPassword }) {
  await ClientDataAccess.updateClientPasswordDB(token.client._id, sha256(newPassword + "t2KB14o1"));

  return {};
};

exports.forgotPasswordService = async function ({ email, type }) {
  const clientWithEmail = await ClientDataAccess.getClientByEmailAndTypeDB(email, type);

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

exports.signupWithGoogleService = async function ({ email, googleID, type }) {
  const clientWithEmail = await ClientDataAccess.getClientByEmailAndTypeDB(email, type);

  if (!isNull(clientWithEmail)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_IS_ALREADY_REGISTERED);
  }

  const newClient = await ClientDataAccess.createClientDB({
    email,
    type,
    googleID,
    isVerified: true,
  });

  return await createTokenAndFormat(newClient);
};

exports.loginWithGoogleService = async function ({ email, googleID, type }) {
  const clientWithEmail = await ClientDataAccess.getClientByEmailAndTypeDB(email, type);

  if (isNull(clientWithEmail)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_DOES_NOT_EXIST);
  }

  // another person tried to access this account or client registered withoutgoogle
  if (clientWithEmail.googleID != googleID) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_GOOGLE_ID_DOES_NOT_MATCH);
  }

  return await createTokenAndFormat(clientWithEmail);
};
