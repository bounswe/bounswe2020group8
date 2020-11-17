const ClientDataAccess = require("../dataAccess/client");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const Messages = require("../util/messages");
const { sha1 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
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

exports.changePasswordService = async function({ token, newPassword }) {
  await ClientDataAccess.updateClientPasswordDB(token.client._id, newPassword);

  return {};
};
