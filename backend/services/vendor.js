const VendorDataAccess = require("../dataAccess/vendor");
const ClientTokenDataAccess = require("../dataAccess/clientToken");
const ProductDataAccess = require("../dataAccess/product");
const MainProductDataAccess = require("../dataAccess/mainProduct");
const ProductRequestDataAccess = require("../dataAccess/productRequest");
const Messages = require("../util/messages");
const { sha1, sha256 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
const sendEmail = require("../util/emailer");
const Config = require("../config");

//
exports.signupService = async function ({
  email,
  password,
  name,
  lastName,
  companyName,
  companyDomainName,
  locations,
}) {
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
      companyName,
      companyDomainName,
      locations,
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

  return {};
};

exports.getProfile = async function ({ client }) {
  return Formatters.formatVendor(client);
};

exports.patchProfile = async function ({ client, data }) {
  const updatedVendor = await VendorDataAccess.updateVendorDB(client._id, data);
  return Formatters.formatVendor(updatedVendor);
};

exports.freezeProfile = async function ({ client, data }) {
  const frozenVendor = await VendorDataAccess.updateVendorDB(client._id, data);
  await ClientTokenDataAccess.removeClientTokenDB(client._id);
  return {
    data: null,
  };
};

exports.getAllMyMainProductsService = async function ({ vid }) {
  const myProducts = await MainProductDataAccess.getMainProductsByVendorDB(vid);
  return {
    results: myProducts.length,
    data: myProducts,
  };
};

exports.getAllMyProductsService = async function ({ vid }) {
  const myProducts = await ProductDataAccess.getProductsByVendorIdDB(vid);
  return {
    results: myProducts.length,
    data: myProducts,
  };
};

exports.getMyProductService = async function ({ vid, pid }) {
  const product = await ProductDataAccess.getProductByVendorIdDB(pid, vid);
  return {
    data: product,
  };
};

// Can update photos too,
exports.updateMyProductService = async function ({ vid, pid, data }) {
  let productRequest = {
    type: "UPDATE_PRODUCT",
    status: "PENDING",
    vendorID: vid,
    oldValue: pid,
    newValue: data,
    messageFromAdmin: null,
  };
  newProductRequest = await ProductRequestDataAccess.createProductRequestDB(productRequest);
  return {
    data: newProductRequest,
  };
};

// We will need to check if there exists any order for the  product vendor sells thay hasn't been delivered.
exports.deleteMyProductService = async function ({ vid, pid }) {
  let productRequest = {
    type: "DELETE_PRODUCT",
    status: "PENDING",
    vendorID: vid,
    oldValue: pid,
    newValue: null,
    messageFromAdmin: null,
  };
  newProductRequest = await ProductRequestDataAccess.createProductRequestDB(productRequest);
  return {
    data: newProductRequest,
  };
};

exports.deleteMeFromMainProductService = async function ({ vid, mpid }) {
  let productRequest = {
    type: "DELETE_MAIN_PRODUCT",
    status: "PENDING",
    vendorID: vid,
    oldValue: mpid,
    newValue: null,
    messageFromAdmin: null,
  };
  newProductRequest = await ProductRequestDataAccess.createProductRequestDB(productRequest);
  return {
    data: newProductRequest,
  };
};

exports.addMeToExistingProductService = async function ({ vid, pid, data }) {
  let productRequest = {
    type: "ADD_EXISTING_PRODUCT",
    status: "PENDING",
    vendorID: vid,
    oldValue: pid,
    newValue: data,
    messageFromAdmin: null,
  };
  newProductRequest = await ProductRequestDataAccess.createProductRequestDB(productRequest);
  return {
    data: newProductRequest,
  };
};

exports.createMyNewProductService = async function ({ vid, data }) {
  let productRequest = {
    type: "ADD_NEW_PRODUCT",
    status: "PENDING",
    vendorID: vid,
    oldValue: null,
    newValue: data,
    messageFromAdmin: null,
  };
  newProductRequest = await ProductRequestDataAccess.createProductRequestDB(productRequest);
  return {
    data: newProductRequest,
  };
};

exports.getOneVendorPublicService = async function ({ vid }) {
  newProductRequest = await VendorDataAccess.getVendorByIdDB(vid);
  return Formatters.formatVendorPublic(newProductRequest);
};
