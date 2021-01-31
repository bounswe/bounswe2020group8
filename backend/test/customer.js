require("./testDatabaseReset");

const mongooseConfig = require("../mongoose_config");
const CustomerService = require("../services/customer");
const chai = require("chai");
const expect = chai.expect;
const Config = require("../config");
const Customer = require("../models/customer");

const mongoose = require("mongoose");

if (Config.env == "test") {
  mongooseConfig.connect(Config);
} else {
  console.log("ENVIRONMENT IS NOT TEST");
  return 1;
}

describe("signup signupService()", () => {
  it("should not be able to create a new customer in database", async () => {
    inputs = {
      email: "customer1@test123.com",
      password: "ABC12345a",
      name: "customer1",
      lastName: "customer1",
    };
    try {
      result = await CustomerService.signupService(inputs);
    } catch (error) {
      expect(error).to.include({ code: 9 });
    }
  });
  it("should create a new customer in database", async () => {
    inputs = {
      email: "customer2@test123.com",
      password: "ABC12345a",
      name: "customer2",
      lastName: "customer2",
    };
    result = await CustomerService.signupService(inputs);
    customer = await Customer.findOne({ email: "customer2@test123.com" });
    expect(customer).to.include({ email: "customer2@test123.com" });
    expect(customer.password).to.not.equal("ABC12345a"); // because of hashing
  });
});

describe("getProductRecommendationService()", () => {
  it("should return at least one receommendation for the customer", async () => {
    customer = await Customer.findOne({ _id: "5fea8047161e5428c3caa3ba" });

    result = await CustomerService.getProductRecommendationService({ customer });
    expect(result.results).to.be.above(0);
    expect(result.data[0].matches).to.be.above(0);
  });
});
