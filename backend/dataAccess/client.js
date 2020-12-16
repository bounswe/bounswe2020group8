const mongoose = require("mongoose");

const Client = mongoose.model("Client");

exports.populateClientDB = function (obj, path = "client") {
  return Client.populate(obj, {
    path,
    model: "Client",
  });
};

exports.getClientByIdDB = function (_id) {
  return Client.findById(_id).lean();
};

exports.getClientByEmailAndTypeDB = function (email, __type) {
  return Client.findOne({
    email,
    __type,
  }).lean();
};

exports.updateClientPasswordDB = function (_id, password) {
  return Client.findByIdAndUpdate(
    _id,
    {
      $set: {
        password,
      },
    },
    { _id: 1 }
  );
};

exports.updateClientVerifyEmailTokenDB = function (_id, verifyEmailToken) {
  return Client.findByIdAndUpdate(
    _id,
    {
      $set: {
        verifyEmailToken,
      },
    },
    { _id: 1 }
  );
};

exports.updateClientResetPasswordTokenDB = function (_id, resetPasswordToken) {
  return Client.findByIdAndUpdate(
    _id,
    {
      $set: {
        resetPasswordToken,
      },
    },
    { _id: 1 }
  );
};

exports.getClientByVerifyEmailTokenDB = function (verifyEmailToken) {
  return Client.findOne({
    verifyEmailToken,
  }).lean();
};

exports.getClientByResetPasswordTokenDB = function (resetPasswordToken) {
  return Client.findOne({
    resetPasswordToken,
  }).lean();
};

exports.updateClientDB = function (_id, fields) {
  return Client.findByIdAndUpdate(
    _id,
    {
      $set: fields,
    },
    { _id: 1, new: true, runValidators: true }
  );
};
