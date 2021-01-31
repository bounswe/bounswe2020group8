const BaseUtil = require("../util/baseUtil");
const BB = require("bluebird");
const RatingService = require("../services/rating");
const AppValidator = require("../util/appValidator");

exports.patchRatingVendorController = BaseUtil.createController((req) => {
  let _id = req.params.vid;
  let { rate } = req.body;
  return BB.all([AppValidator.isValidRange(0, 10, rate).reflect()])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => RatingService.patchRatingVendorService(_id, rate));
});
