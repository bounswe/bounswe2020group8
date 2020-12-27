exports.filter = function (query) {
  const queryObj = { ...query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // 1B) Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt|regex)\b/g, (match) => `$${match}`);

  return JSON.parse(queryStr);
};

exports.sort = function (query) {
  if (query.sort) {
    if (query.sort.startsWith("-")) {
      let sort = query.sort.substring(1);
      return { [sort]: -1 };
    } else {
      return { [query.sort]: 1 };
    }
  } else {
    return { matches: -1 };
  }
};

exports.skip = function (query) {
  const page = query.page * 1 || 1;
  const limit = query.limit * 1 || 20;
  const skip = (page - 1) * limit;

  return skip;
};

exports.limit = function (query) {
  const limit = query.limit * 1 || 20;

  return limit;
};
