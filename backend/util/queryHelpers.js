mongoose = require("mongoose");
exports.filter = function (query) {
  const queryObj = { ...query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // 1B) Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt|regex)\b/g, (match) => `$${match}`);
  console.log(queryStr);

  obj = JSON.parse(queryStr);
  for (var key in obj) {
    if (key == "maxPrice" || key == "minPrice") {
      if (obj[key] instanceof Object) {
        for (var key2 in obj[key]) {
          obj[key][key2] = parseInt(obj[key][key2]);
        }
      } else if (typeof obj[key] == "string") {
        obj[key] = parseInt(obj[key]);
      }
    }
    if (key == "rating") {
      if (obj[key] instanceof Object) {
        obj["mainProduct.rating"] = {};
        for (var key2 in obj[key]) {
          obj["mainProduct.rating"][key2] = parseInt(obj[key][key2]);
        }
      } else if (typeof obj[key] == "string") {
        obj["mainProduct.rating"] = parseInt(obj[key]);
      }
      delete obj[key];
    } else if (key == "brand" || key == "category") {
      if (typeof obj[key] == "string") {
        let list = obj[key].split(",");
        obj[key] = { $in: list };
      }
    } else if (key == "vendors") {
      if (typeof obj[key] == "string") {
        let vendorList = obj[key].split(",");
        vendorList = vendorList.map((el) => mongoose.Types.ObjectId(el));
        delete obj[key];
        obj["vendors._id"] = { $in: vendorList };
      }
    } else {
      if (typeof obj[key] == "string") {
        let paramList = obj[key].split(",");
        paramList.forEach((el) => el.toLowerCase());
        newkey = `parameters.${key}`;
        obj[newkey] = { $in: paramList };
        delete obj[key];
      }
    }
  }
  console.log(obj);
  return obj;
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
