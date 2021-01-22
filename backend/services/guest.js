const GuestDataAccess = require("../dataAccess/guest");
const mongoose = require("mongoose");
const Messages = require("../util/messages");
const { sha1, sha256 } = require("../util/baseUtil");
const { isNull } = require("../util/coreUtil");
const AppError = require("../util/appError");
const Formatters = require("../util/format");
const sendEmail = require("../util/emailer");
const Config = require("../config");

exports.getIDService = async function ({ }) {
  _id = mongoose.Types.ObjectId();
  date = Date.now();
  data = { _id: _id, date: date};
  shoppingCart = GuestDataAccess.populateGuestShoppingCartDB(data);
  return {data: {_id: _id}};
};
