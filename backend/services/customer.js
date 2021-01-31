const CustomerDataAccess = require("../dataAccess/customer");
const OrderDataAccess = require("../dataAccess/order");
const ProductDataAccess = require("../dataAccess/product");

const ClientTokenDataAccess = require("../dataAccess/clientToken");
const Messages = require("../util/messages");
const { sha1, sha256 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
const sendEmail = require("../util/emailer");
const Config = require("../config");
const Constants = require("../util/constants");

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

exports.getProfile = async function ({ client }) {
  return Formatters.formatCustomer(client);
};

exports.patchProfile = async function ({ client, data }) {
  const updatedCustomer = await CustomerDataAccess.updateCustomerDB(client._id, data);
  return Formatters.formatCustomer(updatedCustomer);
};

exports.freezeProfile = async function ({ client, data }) {
  const frozenCustomer = await CustomerDataAccess.updateCustomerDB(client._id, data);
  await ClientTokenDataAccess.removeClientTokenDB(client._id);
  return {
    data: null,
  };
};

exports.getProductRecommendationService = async function ({ customer }) {
  let orderTags = await OrderDataAccess.getProductTagsInLastOrders(customer._id);
  let searchTags = customer.searchHistory
    .slice(-10)
    .map((el) => el.tags)
    .reduce((list, el) => {
      return list.concat(el);
    });
  let purchasedMainProducts = await OrderDataAccess.getProductsInLastOrders(customer._id);

  allTags = orderTags.concat(searchTags);
  freqTable = listToFreqDict(allTags);
  console.log(freqTable);
  Constants.BASIC_COLORS.forEach((el) => {
    delete freqTable[el];
  });
  console.log(freqTable);

  delete freqTable.hotsellers;
  delete freqTable.trendings;

  let products = await ProductDataAccess.getProductRecommendations(
    freqTable,
    purchasedMainProducts
  );
  products = products.map((el) => {
    matches = el.matches.reduce((acc, el) => {
      return acc + freqTable[el];
    }, 0);
    el.matches = matches;
    return el;
  });
  products = products.sort((a, b) => b.matches - a.matches);
  return { results: products.length, data: products };
};

function listToFreqDict(list) {
  let dict = {};
  for (i = 0; i < list.length; i++) {
    if (dict[list[i]]) {
      dict[list[i]] = dict[list[i]] + 1;
    } else {
      dict[list[i]] = 1;
    }
  }
  return dict;
}
