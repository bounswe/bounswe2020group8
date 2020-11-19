const mongoose = require("mongoose");

const ClientToken = mongoose.model("ClientToken");
const Client = mongoose.model("Client");

exports.getClientTokenDB = async function (tokenCode) {
  return ClientToken.findOne({ tokenCode })
    .populate({
      path: "client",
      model: "Client",
    })
    .lean();
};

exports.populateClientOfTokenDB = function (tokenObj) {
  return Client.populate(tokenObj, {
    path: "client",
    model: "Client",
  });
};

exports.removeClientTokenDB = function (_id) {
  return ClientToken.deleteOne({
    _id,
  });
};

exports.createClientTokenDB = function (clientToken) {
  return ClientToken.create(clientToken);
};
