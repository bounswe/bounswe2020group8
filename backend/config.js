const Constants = require("./util/constants");

const config = {
  prod: {
    port: process.env.PORT || 8080,
    db:
      process.env.MAIN_DB ||
      "mongodb://admin:admin@3.121.223.75/prod?authSource=admin",
    s3: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID | "AKIAYKBH3PBYTPPJCS54",
      secretAccessKey:
        process.env.S3_SECRET_ACCESS_KEY |
        "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"
    }
  },
  dev: {
    port: process.env.PORT || 8080,
    db:
      process.env.MAIN_DB ||
      "mongodb://admin:admin@3.121.223.75/test?authSource=admin",
    s3: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID | "AKIAYKBH3PBYTPPJCS54",
      secretAccessKey:
        process.env.S3_SECRET_ACCESS_KEY |
        "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"
    }
  }
};

module.exports = config[process.env.NODE_ENV || Constants.NODE_ENV];
