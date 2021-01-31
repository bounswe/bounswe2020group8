require("./testDatabaseReset");

const mongooseConfig = require("../mongoose_config");
const CommentService = require("../services/comment");
const chai = require("chai");
const expect = chai.expect;
const Config = require("../config");
const Product = require("../models/comment");
const mongoose = require("mongoose");

if (Config.env == "test") {
  mongooseConfig.connect(Config);
} else {
  console.log("ENVIRONMENT IS NOT TEST");
  return 1;
}

describe(" getAllCommentsOfAProduct()", () => {
  before(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
  after(() => {});
  beforeEach(() => {});
  afterEach(() => {});
  it("it should retrieve all comments of a product", async () => {
    result = await CommentService.getAlCommentsService("60165a978f88f5252633eb82");

    expect(result.results).to.be.above(0);
    expect(result.data).to.have.lengthOf.above(0);
  });
});

describe(" createACommentOfAProduct()", () => {
  before(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
  after(() => {});
  beforeEach(() => {});
  afterEach(() => {});
  it("it should create a comment of a product", async () => {
    result = await CommentService.createOneCommentService(
      "60165a978f88f5252633eb82",
      "5fea8047161e5428c3caa3ba",
      "I really give 5 stars to this product",
      5,
      "Derya",
      "Caliskan"
    );

    expect(result.results).to.be.above(0);
    expect(result.data).to.have.own.property("text");
    expect(result.data).to.have.own.property("rate");
  });
});
