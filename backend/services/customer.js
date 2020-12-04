const CustomerDataAccess = require("../dataAccess/customer");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const Messages = require("../util/messages");
const { sha1, sha256 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
const sendEmail = require("../util/emailer");
const Config = require("../config");
//

exports.signupService = async function ({ email, password, name, lastName }) {
  const customerWithEmail = await CustomerDataAccess.getCustomerByEmailDB(email);

  if (!isNull(customerWithEmail)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_IS_ALREADY_REGISTERED);
  }

  const encryptedPassword = sha256(password + "t2KB14o1");
  const newCustomer = (
    await CustomerDataAccess.createCustomerDB({
      email,
      password: encryptedPassword,
      name,
      lastName,
    })
  ).toObject();

  const verifyEmailToken = Date.now() + sha1(newCustomer._id.toString() + Date.now());
  const updatedCustomer = await CustomerDataAccess.updateCustomerVerifyEmailTokenDB(
    newCustomer._id,
    verifyEmailToken
  );

  const resetURL = `http://${Config.hostAddr}:${Config.port}/customer/verifyEmail?verifyEmailToken=${verifyEmailToken}`;

  try {
    await sendEmail({
      email,
      subject: "Email verification",
      message: `You can follow the link ${resetURL} to finish sign up process.`,
    });
  } catch (error) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_SEND_EMAIL_FAILED);
  }

  return {};
};

exports.signupWithGoogleService = async function ({ email, googleID }) {
  const customerWithEmail = await CustomerDataAccess.getCustomerByEmailDB(email);

  if (!isNull(customerWithEmail)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_IS_ALREADY_REGISTERED);
  }

  const newCustomer = await CustomerDataAccess.createCustomerDB({
    email,
    googleID,
    isVerified: true,
  });

  let newClientToken = (
    await ClientTokenDataAccess.createClientTokenDB({
      tokenCode: Date.now() + sha1(newCustomer._id.toString() + Date.now()),
      client: newCustomer._id,
    })
  ).toObject();

  return {
    tokenCode: newClientToken.tokenCode,
  };
};

exports.loginWithGoogleService = async function ({ email, googleID }) {
  const customerWithEmail = await CustomerDataAccess.getCustomerByEmailDB(email);

  if (isNull(customerWithEmail)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_DOES_NOT_EXIST);
  }

  // another person tried to access this account or client registered withoutgoogle
  if (customerWithEmail.googleID != googleID) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_GOOGLE_ID_DOES_NOT_MATCH);
  }

  let newClientToken = (
    await ClientTokenDataAccess.createClientTokenDB({
      tokenCode: Date.now() + sha1(customerWithEmail._id.toString() + Date.now()),
      client: customerWithEmail._id,
    })
  ).toObject();

  return {
    tokenCode: newClientToken.tokenCode,
  };
};

exports.getProfile = async function ({ token }) {
  const customer = await CustomerDataAccess.getCustomerByIdDB(token.customer._id);

  if (isNull(customer)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_INSUFFICIENT_TOKEN);
  }

  return Formatters.formatCustomer({
    id: customer._id,
    email: customer.email,
    name: customer.name,
    lastName: customer.lastName,
    addresses: customer.addresses,
    phoneNumber: customer.phoneNumber,
    birthday: customer.birthday,
  });
};

exports.patchProfile = async function ({ data, tokenCode }) {
  const customer = await CustomerDataAccess.getCustomerByIdDB(tokenCode.customer._id);

  if (isNull(customer)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_INSUFFICIENT_TOKEN);
  }

  await CustomerDataAccess.updateCustomerDB(customer._id, data);
  return {};
};

exports.deleteUser = async function ({ isSuspended, tokenCode }) {
  const customer = await CustomerDataAccess.getCustomerByIdDB(tokenCode.customer._id);

  if (isNull(customer)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_INSUFFICIENT_TOKEN);
  }

  await CustomerDataAccess.updateCustomerDB(customer._id, isSuspended);
  await ClientTokenDataAccess.removeClientTokenDB(customer._id);
};
