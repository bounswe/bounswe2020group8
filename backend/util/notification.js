const mongoose = require("mongoose");

const ClientDataAccess = require("../dataAccess/client");

exports.registerNotification = async (client_id, notification) => {
  await ClientDataAccess.populateNotification(client_id, notification);
};
