const mongoose = require("mongoose");
const AppError = require("../util/appError");
const Messages = require("../util/messages");
const QueryHelper = require("../util/queryHelpers");
const Product = mongoose.model("Product");
const { isNullOrEmpty } = require("../util/coreUtil");

exports.populateProductDB = function (obj, path = "product") {
  return Product.populate(obj, {
    path,
    model: "Product",
  });
};

exports.getMainProductIDofAProduct = function (pid) {
  let pidObj = mongoose.Types.ObjectId(pid);
  return Product.aggregate([
    { $match: { _id: pidObj } },
    { $project: { parentProduct: 1, _id: 0 } },
  ]);
};

exports.deleteProductsByIdDB = function (idlist) {
  return Product.deleteMany({ _id: { $in: idlist } }).lean();
};

exports.deleteProductByIdDB = function (_id) {
  return Product.findByIdAndDelete(_id).lean();
};

exports.getProductByIdDB = function (_id) {
  return Product.findById(_id).lean();
};

exports.createProductDB = function (product) {
  return Product.create(product);
};

exports.deleteProductsByParentIdDB = function (parentId) {
  return Product.deleteMany({ parentProduct: parentId });
};

/*
Finds products of a specific vendor for a specific main product. Deletes the vendor from products. If the vendor is the only one selling the item,
product is deleted. Otherwise it is updated. Also if the deleted vendor's price was the lowest, default product is updated by the next lowest price.
*/
exports.deleteVendorFromProductsByVendorIdDB = function (mpid, vid) {
  return Product.find({ parentProduct: mpid, "vendorSpecifics.vendorID": vid }, (err, docs) => {
    if (err) {
      throw err;
    }

    docs.forEach(async (doc) => {
      const index = doc.vendorSpecifics.findIndex((vendor) => vendor.vendorID == vid);
      doc.vendorSpecifics.pull(doc.vendorSpecifics[index]._id);
      if (doc.vendorSpecifics.length == 0) {
        await Product.deleteOne({ _id: doc._id });
      } else if (doc.default.vendorID == vid) {
        minPrice = doc.vendorSpecifics.reduce((min, current) =>
          current.price < min.price ? current : min
        );
        doc.default = minPrice;
        doc.markModified("default");
      }
      await doc.save();
    });
  });
};
/*
Finds the product of a specific vendor. Deletes the vendor from product. If the vendor is the only one selling the item,
product is deleted. Otherwise it is updated. Also if the deleted vendor's price was the lowest, default product is updated by the next lowest price.
*/
exports.deleteVendorFromProductByVendorIdDB = function (pid, vid) {
  return Product.findOne({ _id: pid, "vendorSpecifics.vendorID": vid }, async (err, doc) => {
    if (err) {
      throw err;
    }
    const index = doc.vendorSpecifics.findIndex((vendor) => vendor.vendorID == vid);

    doc.vendorSpecifics.pull(doc.vendorSpecifics[index]._id);

    if (doc.vendorSpecifics.length == 0) {
      await Product.deleteOne({ _id: doc._id });
    } else if (doc.default.vendorID == vid) {
      minPrice = doc.vendorSpecifics.reduce((min, current) =>
        current.price < min.price ? current : min
      );
      doc.default = minPrice;
      doc.markModified("default");
    }
    await doc.save();
  });
};

/*
Finds the product with the specific pid. Adds the vendor to the product. if the vendor's price was the lowest, default product is updated by the new vendor's price.
*/
exports.addVendorToProductDB = function (pid, vendorData) {
  return Product.findOne({ _id: pid }, async (err, doc) => {
    if (err) {
      throw err;
    }
    vid = mongoose.Types.ObjectId(vendorData.vendorID);
    const alreadyExists = doc.vendorSpecifics.some((vendor) => {
      return vendor.vendorID == vendorData.vendorID;
    });
    if (alreadyExists == true) {
      return new AppError(Messages.RETURN_MESSAGES.ERR_VENDOR_ALREADY_EXISTS);
    }
    doc.vendorSpecifics.push(vendorData);

    if (doc.default.price > vendorData.price) {
      doc.default = vendorData;
      doc.markModified("default");
    }

    await doc.save();
  });
};
/*
Finds the product with the specific pid. Updates the vendor in the product. If the new vendor's new price is lower than the default product. Default 
product is updated with the updated vendor's price.
*/
exports.updateVendorInProductByVendorIdDB = function (pid, vid, vendorData) {
  return Product.findOne({ _id: pid, "vendorSpecifics.vendorID": vid }, async (err, doc) => {
    if (err) {
      throw err;
    }
    index = doc.vendorSpecifics.findIndex((vendor) => vendor.vendorID == vid);
    vendorData._id = doc.vendorSpecifics[index]._id;
    doc.vendorSpecifics.set(index, vendorData);
    if (vendorData.vendorID == doc.default.vendorID && vendorData.price > doc.default.price) {
      minPrice = doc.vendorSpecifics.reduce((min, current) =>
        current.price < min.price ? current : min
      );
      doc.default = minPrice;
      doc.markModified("default");
    } else if (vendorData.price < doc.default.price) {
      doc.default = vendorData;
      doc.markModified("default");
    }
    doc.save();
  });
};

exports.getProductsByVendorIdDB = function (vid) {
  return Product.aggregate([
    {
      $unwind: "$vendorSpecifics",
    },
    {
      $match: { "vendorSpecifics.vendorID": vid },
    },
    {
      $project: { default: 0 },
    },
  ]);
};

exports.updateProductAmountLeftDB = function (productId, vendorId, amount) {
  return Product.findOneAndUpdate(
    { _id: productId, vendorSpecifics: { $elemMatch: { vendorID: vendorId } } },
    {
      $inc: {
        "vendorSpecifics.$.amountLeft": amount,
      },
    },
    { new: true }
  );
};

exports.getProductByVendorIdDB2 = function (pid, vid) {
  // Second version is for order operations and returns slighlty different data
  return Product.findOne(
    { _id: pid, vendorSpecifics: { $elemMatch: { vendorID: vid } } },
    { "vendorSpecifics.$": 1 }
  );
};

exports.getProductByProductIDAndVendorID = function (pid, vid) {
  let pidObj = mongoose.Types.ObjectId(pid);
  let vidObj = mongoose.Types.ObjectId(vid);
  return Product.aggregate([
    {
      $match: { _id: pidObj, "vendorSpecifics.vendorID": vidObj },
    },
    {
      $set: {
        vendorInfo: {
          $reduce: {
            input: "$vendorSpecifics",
            initialValue: {},
            in: {
              $cond: [{ $eq: ["$$this.vendorID", vidObj] }, "$$this", "$$value"],
            },
          },
        },
      },
    },
    {
      $project: { vendorInfo: 1, parentProduct: 1 },
    },
  ]);
};

exports.getProductByProductIDAndVendorID2 = function (pid, vid) {
  let pidObj = mongoose.Types.ObjectId(pid);
  let vidObj = mongoose.Types.ObjectId(vid);
  return Product.aggregate([
    {
      $match: { _id: pidObj, "vendorSpecifics.vendorID": vidObj },
    },
    {
      $set: {
        vendorInfo: {
          $reduce: {
            input: "$vendorSpecifics",
            initialValue: {},
            in: {
              $cond: [{ $eq: ["$$this.vendorID", vidObj] }, "$$this", "$$value"],
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "MainProducts",
        localField: "parentProduct",
        foreignField: "_id",
        as: "parentProduct",
      },
    },
    {
      $project: { vendorSpecifics: 0, default: 0 },
    },
  ]);
};

exports.getProductByVendorIdDB = function (pid, vid) {
  let pidObj = mongoose.Types.ObjectId(pid);

  return Product.aggregate([
    { $match: { _id: pidObj } },
    {
      $unwind: "$vendorSpecifics",
    },
    {
      $match: { "vendorSpecifics.vendorID": vid },
    },
    {
      $project: { default: 0 },
    },
  ]);
};

exports.getProductByVendorIdDB3 = function (pid, vid) {
  // Third version is for shoppingCart operations and returns slighlty different data

  return Product.findOne({ _id: pid, vendorSpecifics: { $elemMatch: { vendorID: vid } } });
};

exports.getProductByEmailDB = function (email) {
  return Product.findOne({
    email,
  }).lean();
};

exports.getProductByVerifyEmailTokenDB = function (verifyEmailToken) {
  return Product.findOne({
    verifyEmailToken,
  }).lean();
};

exports.getProductByResetPasswordTokenDB = function (resetPasswordToken) {
  return Product.findOne({
    resetPasswordToken,
  }).lean();
};

/*
Searches product in the database containing at least one of the tags. Then it ranks the product with the number of matches while putting the
documents in a usable format for requesters. After that, the products are filtered, sorted, limited and paginated according to the query string.
An example could be ?minPrice[gt]=200&rating=4.2&sort=maxPrice&limit=10&page=20. Filterable fields for a specific querycan be found using the endpoint
/GET /product/searchFilters with the same query string.
*/
exports.searchProducts = function (query, tags) {
  let filter = QueryHelper.filter(query);
  let sort = QueryHelper.sort(query);
  let skip = QueryHelper.skip(query);
  let limit = QueryHelper.limit(query);

  let matched_statement;
  let matches;
  // If the tags is null or empty search returns all the products
  if (!isNullOrEmpty(tags)) {
    matched_statement = { $match: { tags: { $in: tags } } };
    matches = {
      $reduce: {
        input: "$tags",
        initialValue: 0,
        in: {
          $cond: [{ $in: ["$$this", tags] }, { $add: ["$$value", 1] }, "$$value"],
        },
      },
    };
  } else {
    matched_statement = { $match: {} };
    matches = 1;
    tags = [];
  }
  return Product.aggregate([
    matched_statement,
    {
      $set: {
        maxPrice: { $max: "$vendorSpecifics.price" },
        minPrice: { $min: "$vendorSpecifics.price" },
        parameters: {
          $arrayToObject: {
            $map: {
              input: "$parameters",
              as: "el",
              in: { k: "$$el.name", v: "$$el.value" },
            },
          },
        },
        vendors: "$vendorSpecifics.vendorID",
        matches: matches,
      },
    },
    {
      // group by main Product, while grouping take the boundary values of products belonging to the same main product
      $group: {
        _id: "$parentProduct",
        products: { $push: { _id: "$_id", photos: "$photos", matches: "$matches" } },
        matches: { $max: "$matches" },
        maxPrice: { $max: "$maxPrice" },
        minPrice: { $min: "$minPrice" },
        vendors: { $push: "$vendors" },
        parameters: { $push: "$parameters" },
      },
    },
    {
      $set: {
        mainProduct: "$_id",
        product: {
          $reduce: {
            input: "$products",
            initialValue: { matches: 0 },
            in: { $cond: [{ $gt: ["$$this.matches", "$$value.matches"] }, "$$this", "$$value"] },
          },
        },
        vendors: {
          $reduce: {
            input: "$vendors",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] },
          },
        },
      },
    },
    { $addFields: { vendors: { $setUnion: ["$vendors", []] } } },
    {
      $lookup: {
        from: "MainProducts",
        localField: "mainProduct",
        foreignField: "_id",
        as: "mainProduct",
      },
    },
    {
      $lookup: {
        from: "Clients",
        localField: "vendors",
        foreignField: "_id",
        as: "vendors",
      },
    },
    {
      $project: {
        mpid: "$_id",
        _id: 0,
        "product._id": 1,
        "product.photos": 1,
        matches: 1,
        maxPrice: 1,
        minPrice: 1,
        parameters: 1,
        brand: { $arrayElemAt: ["$mainProduct.brand", 0] },
        category: { $arrayElemAt: ["$mainProduct.category", 0] },
        "mainProduct._id": 1,
        "mainProduct.title": 1,
        "mainProduct.rating": 1,
        "mainProduct.numberOfRating": 1,
        "vendors._id": 1,
        "vendors.companyName": 1,
      },
    },
    { $match: filter },
    { $sort: sort },
    { $skip: skip },
    { $limit: limit },
    { $unset: ["parameters"] },
  ]);
};
/* 
Return the filterable fields for a specific query string. It is best used before a POST /product/search call. If an empty query string is given, filterable fields
for specific categories can be found by using the following query paramters: ?category=Electronics.
*/
exports.getSearchFilters = function (query, tags) {
  let filter = QueryHelper.filter(query);
  let matched_statement;
  if (!isNullOrEmpty(tags)) {
    matched_statement = { $match: { tags: { $in: tags } } };
  } else {
    matched_statement = { $match: filter };
    tags = [];
  }
  return Product.aggregate([
    matched_statement,
    {
      $set: {
        maxPrice: { $max: "$vendorSpecifics.price" },
        minPrice: { $min: "$vendorSpecifics.price" },
        vendors: "$vendorSpecifics.vendorID",
      },
    },
    { $unwind: "$parameters" },
    {
      $group: {
        _id: "$parameters.name",
        values: { $addToSet: "$parameters.value" },
        maxPrice: { $max: "$maxPrice" },
        minPrice: { $min: "$minPrice" },
        vendors: { $push: "$vendors" },
        brands: { $addToSet: "$brand" },
        categories: { $addToSet: "$category" },
      },
    },
    {
      $set: {
        vendors: {
          $reduce: {
            input: "$vendors",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] },
          },
        },
      },
    },
    {
      $addFields: {
        vendors: { $setUnion: ["$vendors", []] },
      },
    },
    { $set: { parameters: { name: "$_id", values: "$values" } } },
    {
      $group: {
        _id: null,
        parameters: { $push: "$parameters" },
        maxPrice: { $max: "$maxPrice" },
        minPrice: { $min: "$minPrice" },
        vendors: { $push: "$vendors" },
        brands: { $push: "$brands" },
        categories: { $push: "$categories" },
      },
    },
    {
      $set: {
        vendors: {
          $reduce: {
            input: "$vendors",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] },
          },
        },
        brands: {
          $reduce: {
            input: "$brands",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] },
          },
        },
        categories: {
          $reduce: {
            input: "$categories",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] },
          },
        },
      },
    },
    {
      $addFields: {
        vendors: { $setUnion: ["$vendors", []] },
        brands: { $setUnion: ["$brands", []] },
        categories: { $setUnion: ["$categories", []] },
      },
    },
    {
      $lookup: {
        from: "Clients",
        localField: "vendors",
        foreignField: "_id",
        as: "vendors",
      },
    },
    {
      $project: {
        parameters: 1,
        maxPrice: 1,
        minPrice: 1,
        brands: 1,
        categories: 1,
        "vendors._id": 1,
        "vendors.companyName": 1,
      },
    },
  ]);
};
/*
Given a frequency table for some tags, it finds the products matching with the keys of the frequency table. After grouping products into main products 
the match count of the main products are calculated by using the frequency table.  the most frequent tags have the most effect to the match value. After putting
the documents in a usable format, First 20 products with the greatest amount of matches returned.
*/
exports.getProductRecommendations = function (freqTable, purchasedMainProducts) {
  tags = Object.keys(freqTable);
  return Product.aggregate([
    { $match: { tags: { $in: tags } } },
    {
      $set: {
        freqTable: freqTable,
        maxPrice: { $max: "$vendorSpecifics.price" },
        minPrice: { $min: "$vendorSpecifics.price" },
        parameters: {
          $arrayToObject: {
            $map: {
              input: "$parameters",
              as: "el",
              in: { k: "$$el.name", v: "$$el.value" },
            },
          },
        },
        vendors: "$vendorSpecifics.vendorID",
        matches: {
          $filter: {
            input: "$tags",
            as: "tag",
            cond: { $in: ["$$tag", tags] },
          },
        },
      },
    },
    {
      $group: {
        _id: "$parentProduct",
        products: { $push: { _id: "$_id", photos: "$photos", matches: "$matches" } },
        matches: { $push: "$matches" },
        maxPrice: { $max: "$maxPrice" },
        minPrice: { $min: "$minPrice" },
        vendors: { $push: "$vendors" },
        parameters: { $push: "$parameters" },
      },
    },
    { $match: { _id: { $nin: purchasedMainProducts } } },
    {
      $set: {
        mainProduct: "$_id",
        product: {
          $reduce: {
            input: "$products",
            initialValue: { matches: 0 },
            in: { $cond: [{ $gt: ["$$this.matches", "$$value.matches"] }, "$$this", "$$value"] },
          },
        },
        vendors: {
          $reduce: {
            input: "$vendors",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] },
          },
        },
        matches: {
          $reduce: {
            input: "$matches",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] },
          },
        },
      },
    },
    {
      $addFields: {
        vendors: { $setUnion: ["$vendors", []] },
        matches: { $setUnion: ["$matches", []] },
      },
    },
    {
      $lookup: {
        from: "MainProducts",
        localField: "mainProduct",
        foreignField: "_id",
        as: "mainProduct",
      },
    },
    {
      $lookup: {
        from: "Clients",
        localField: "vendors",
        foreignField: "_id",
        as: "vendors",
      },
    },
    {
      $project: {
        mpid: "$_id",
        _id: 0,
        "product._id": 1,
        "product.photos": 1,
        matches: 1,
        maxPrice: 1,
        minPrice: 1,
        parameters: 1,
        brand: { $arrayElemAt: ["$mainProduct.brand", 0] },
        category: { $arrayElemAt: ["$mainProduct.category", 0] },
        "mainProduct._id": 1,
        "mainProduct.title": 1,
        "mainProduct.rating": 1,
        "mainProduct.numberOfRating": 1,
        "vendors._id": 1,
        "vendors.companyName": 1,
      },
    },
    { $limit: 20 },
    { $unset: ["parameters"] },
  ]);
};
