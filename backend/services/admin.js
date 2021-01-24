const AdminDataAccess = require("../dataAccess/admin");
const AdminTokenDataAccess = require("../dataAccess/adminToken");
const ActivityDataAccess = require("../dataAccess/activity");
const ClientDataAccess = require("../dataAccess/client");
const AppError = require("../util/appError");
const Messages = require("../util/messages");
const { sha1 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");

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

exports.getAllActivitiesService = async function () {
  let results = await ActivityDataAccess.getAllActivityDB();
  return { result: results.length, data: results };
};

exports.getOneActivityService = async function (_id) {
  let activity = await ActivityDataAccess.getActivityByIdDB(_id);
  let client_id = activity.actor._id;
  let client = ClientDataAccess.getClientByIdDB(client_id);
  activity.actor.client = client;
  return activity;
};

exports.getAllAdminInfoService = async function () {
  let admins = await AdminDataAccess.getAllAdmin();
  return { result: admins.length, data: admins };
};
