const BaseUtil = require("../util/baseUtil");
const BB = require("bluebird");
const factory = require("../services/crudFactory");
const MainProduct = require("../models/mainProduct");
const RatingService = require("../services/rating");
const AppValidator = require("../util/appValidator");

exports.patchRatingProductController = BaseUtil.createController((req) => {
  let _id = req.params.pid;
  let { rate } = req.body;
  return BB.all([AppValidator.isValidRange(0, 5, rate).reflect()])
    .then((results) => BaseUtil.decideErrorExist(results))
    .then(() => RatingService.patchRatingProductService(_id, rate));
});
