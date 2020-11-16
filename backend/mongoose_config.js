/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const mongoose = require("mongoose");
const fs = require("fs");

// require all js files under a certain directory
const modelDirectory = `${__dirname}/models/`;
const files = fs.readdirSync(modelDirectory);
for (let i in files) {
  require(modelDirectory + files[i]);
}

exports.connect = function () {
  mongoose
    .connect(process.env.DATABASE, {
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
