const mongoose = require("mongoose");
const AppError = require("../util/appError");
const Messages = require("../util/messages");

const Product = mongoose.model("Product");
exports.populateProductDB = function (obj, path = "product") {
  return Product.populate(obj, {
    path,
    model: "Product",
  });
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

exports.updateVendorInProductByVendorIdDB = function (pid, vid, vendorData) {
  return Product.findOne({ _id: pid, "vendorSpecifics.vendorID": vid }, async (err, doc) => {
    if (err) {
      throw err;
    }
    index = doc.vendorSpecifics.findIndex((vendor) => vendor.vendorID == vid);
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
