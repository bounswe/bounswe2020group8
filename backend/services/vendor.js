const VendorDataAccess = require("../dataAccess/vendor");
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
  const vendorWithEmail = await VendorDataAccess.getVendorByEmailDB(email);

  if (!isNull(vendorWithEmail)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_IS_ALREADY_REGISTERED);
  }

  const encryptedPassword = sha256(password + "t2KB14o1");
  const newVendor = (
    await VendorDataAccess.createVendorDB({
      email,
      password: encryptedPassword,
      name,
      lastName,
    })
  ).toObject();

  const verifyEmailToken = Date.now() + sha1(newVendor._id.toString() + Date.now());
  const updatedVendor = await VendorDataAccess.updateVendorVerifyEmailTokenDB(
    newVendor._id,
    verifyEmailToken
  );

  const resetURL = `http://${Config.hostAddr}:${Config.port}/vendor/verifyEmail?verifyEmailToken=${verifyEmailToken}`;

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
    vendor: Formatters.formatVendor(updatedVendor),
  };
};

exports.signupWithGoogleService = async function ({ email, googleID }) {
  const vendorWithEmail = await VendorDataAccess.getVendorByEmailDB(email);

  if (!isNull(vendorWithEmail)) {
    throw new AppError(Messages.RETURN_MESSAGES.ERR_CLIENT_IS_ALREADY_REGISTERED);
  }

  const newVendor = await VendorDataAccess.createVendorDB({
    email,
    googleID,
    isVerified: true,
  });

  return await createTokenAndFormat(newVendor);
};
