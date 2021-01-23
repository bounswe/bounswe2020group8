const GuestService = require("../services/guest");
const AppValidator = require("../util/appValidator");
const BaseUtil = require("../util/baseUtil");
const Messages = require("../util/messages");
const BB = require("bluebird");
const factory = require("../services/crudFactory");

exports.getIDController = BaseUtil.createController((req) => {
  return BB.all([]).then(() => GuestService.getIDService({}));
});
