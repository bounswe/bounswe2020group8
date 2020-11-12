/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const mongoose = require("mongoose");
const fs = require("fs");

function addUpdateOptionNew(schema) {
  schema.pre("findOneAndUpdate", function (next) {
    if (this.options.new === undefined) {
      this.findOneAndUpdate({}, {}, { new: true });
    } else if (this.options.new === false) {
      // console.log("addUpdateOptionNewFindOneAndUpdate", "this.options.new===false")
    }
    next();
  });
}

function addUpdatedAt(schema) {
  schema.pre("findOneAndUpdate", function (next) {
    this.findOneAndUpdate({}, { $set: { updatedAt: new Date() } });
    next();
  });
  schema.pre("update", function (next) {
    this.update({}, { $set: { updatedAt: new Date() } });
    next();
  });
}

mongoose.plugin(addUpdateOptionNew);
mongoose.plugin(addUpdatedAt);

// require all js files under a certain directory
const modelDirectory = `${__dirname}/models/`;
const files = fs.readdirSync(modelDirectory);
for (let i in files) {
  require(modelDirectory + files[i]);
}

exports.connect = function (Config) {
  mongoose
    .connect(Config.db, {
      reconnectTries: Number.MAX_VALUE,
      poolSize: 10,
      useNewUrlParser: true,
    })
    .then(
      () => {
        console.log("MONGO CONNECTED");
      },
      (err) => {
        console.log("MONGO CONNECT ERROR", err);
      }
    );
};
