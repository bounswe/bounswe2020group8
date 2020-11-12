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

exports.createClientDB = function (client) {
  return Client.create(client);
};

exports.getClientByEmailDB = function (email) {
  return Client.findOne({
    email,
  }).lean();
};

exports.updateClientLastActiveAtDB = function (_id) {
  return Client.findByIdAndUpdate(
    _id,
    {
      $set: {
        lastActiveAt: Date.now(),
      },
    },
    { _id: 1 }
  );
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
