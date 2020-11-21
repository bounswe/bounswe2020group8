const ClientDataAccess = require("../dataAccess/client");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const Messages = require("../util/messages");
const { sha1 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
const sendEmail = require("../util/emailer");
const Config = require("../config");
//
exports.initService = async function({ token }) {
  await ClientTokenDataAccess.removeClientTokenDB(token._id);

  const newClientToken = (
    await ClientTokenDataAccess.createClientTokenDB({
      tokenCode: Date.now() + sha1(token.client._id.toString() + Date.now()),
      client: token.client._id
    })
  ).toObject();

  return Formatters.formatClientToken({
    ...newClientToken,
    client: token.client
  });
  throw new AppError(Messages.RETURN_MESSAGES.ERR_INSUFFICIENT_TOKEN);
};

exports.loginService = async function({ email, password, type }) {
  const clientWithEmail = await ClientDataAccess.getClientByEmailAndTypeDB(
    email,
    type
  );

  if (isNull(clientWithEmail)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_DOES_NOT_EXIST);
  }

  if (clientWithEmail.password !== password) {
    throw new AppError(
      Messages.RETURN_MESSAGES.ERR_EMAIL_AND_PASSWORD_DOES_NOT_MATCH
    );
  }

  let newClientToken = (
    await ClientTokenDataAccess.createClientTokenDB({
      tokenCode: Date.now() + sha1(clientWithEmail._id.toString() + Date.now()),
      client: clientWithEmail._id
    })
  ).toObject();

  return Formatters.formatClientToken({
    ...newClientToken,
    client: clientWithEmail
  });
};


exports.signupService = async function({ email, password, type, name, lastName }) {
  const clientWithEmail = await ClientDataAccess.getClientByEmailAndTypeDB(email, type);

  if (!isNull(clientWithEmail)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_IS_ALREADY_REGISTERED);
  }

  const newClient = (
    await ClientDataAccess.createClientDB({email, password, type, name, lastName})
  ).toObject();

  const verifyEmailToken = Date.now() + sha1(newClient._id.toString() + Date.now());
  const updatedClient = await ClientDataAccess.updateClientVerifyEmailTokenDB(newClient._id, verifyEmailToken);

  const resetURL = `http://${Config.hostAddr}:${Config.port}/client/verifyEmail?verifyEmailToken=${verifyEmailToken}`;
  
  try {
    await sendEmail({
      email,
      subject: "Email verification",
      message: `You can follow the link ${resetURL} to finish sign up process.`
    });
  } catch (error) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_SEND_EMAIL_FAILED);
  }

  return {
    message: "Verification email sent!",
    client: Formatters.formatClient(updatedClient)
  };
};

exports.verifyEmailService = async function({ verifyEmailToken }) {
  const client = await ClientDataAccess.getClientByVerifyEmailTokenDB(verifyEmailToken)

  if (isNull(client)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_INSUFFICIENT_TOKEN);
  }

  let newClientToken = (
    await ClientTokenDataAccess.createClientTokenDB({
      tokenCode: Date.now() + sha1(client._id.toString() + Date.now()),
      client: client._id
    })
  ).toObject();

  updatedClient = await ClientDataAccess.updateClientDB(client._id, {isVerified: true, verifyEmailToken: undefined})
  
  return Formatters.formatClientToken({
    ...newClientToken,
    client: updatedClient
  });
};


exports.changePasswordService = async function({ token, newPassword }) {
  await ClientDataAccess.updateClientPasswordDB(token.client._id, newPassword);

  return {};
};
