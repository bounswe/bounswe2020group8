const Constants = require("../util/constants");
const ClientDataAccess = require("../dataAccess/client");

exports.registerNotification = async function (client_id, notification) {
  return await ClientDataAccess.populateNotification(client_id, notification);
};

exports.createNotification = async function (notification_type, _hyperlink, optional) {
  let notification = {
    type: notification_type,
    description: Constants.NOTIFICATION_TYPES[notification_type] + "\n" + optional,
    hyperlink: _hyperlink,
  };
  return notification;
};
