const Constants = require("./util/constants");

const config = {
  prod: {
    port: process.env.PORT || 8080,
    db: process.env.MAIN_DB,
    s3: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
  },
  dev: {
    port: process.env.PORT || 8080,
    db:
      process.env.MAIN_DB ||
      "mongodb+srv://testRW:SC3oOJMv25kxb4dH@cluster0.4vqc5.mongodb.net/dev?retryWrites=true",
    s3: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
  }
};

module.exports = config[process.env.NODE_ENV || Constants.NODE_ENV];
