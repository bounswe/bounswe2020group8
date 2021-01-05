/*
  This factory implementation is taken from https://github.com/jonasschmedtmann/complete-node-bootcamp and some modifications are done to make it fit to our project
  There is no license provided however in the readme there is the following question.

  Q8: I want to put the project in my portfolio. Is that allowed?
  A: Absolutely! Just make sure you actually built it yourself by following the course, and that you understand what you did. What is not allowed is that you create your own course/videos/articles based on this course's content!
*/

const AppError = require("../util/appError");
const APIFeatures = require("../util/apiFeatures");
const Messages = require("../util/messages");

exports.deleteOne = (Model) => async (req) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return new AppError(Messages.RETURN_MESSAGES.ERR_NO_DOCUMENT_WITH_ID);
  }

  return {
    data: null,
  };
};

exports.updateOne = (Model) => async (req) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return new AppError(Messages.RETURN_MESSAGES.ERR_NO_DOCUMENT_WITH_ID);
  }

  return {
    data: doc,
  };
};

exports.createOne = (Model) => async (req) => {
  const doc = await Model.create(req.body);

  return {
    data: doc,
  };
};

exports.getOne = (Model, popOptions) => async (req) => {
  let query = Model.findById(req.params.id);
  if (popOptions) query = query.populate(popOptions);
  const doc = await query;

  if (!doc) {
    return new AppError(Messages.RETURN_MESSAGES.ERR_NO_DOCUMENT_WITH_ID);
  }

  return {
    data: doc,
  };
};

exports.getAll = (Model) => async (req) => {
  const features = new APIFeatures(Model.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doc = await features.query;

  return {
    results: doc.length,
    data: doc,
  };
};
