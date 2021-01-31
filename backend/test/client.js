require("./testDatabaseReset");

const mongooseConfig = require("../mongoose_config");
const ClientService = require("../services/authClient");
const chai = require("chai");
const expect = chai.expect;
const Config = require("../config");
const mongoose = require("mongoose");
if (Config.env == "test") {
  mongooseConfig.connect(Config);
} else {
  console.log("ENVIRONMENT IS NOT TEST");
  return 1;
}

describe("Customer loginService()", () => {
  it("should not be able to login", async () => {
    inputs = {
      email: "derya@twzhhq.online",
      password: "random!234",
      __type: "Customer",
    };
    try {
      result = await ClientService.loginService(inputs);
    } catch (error) {
      expect(error).to.include({ code: 5 });
    }
  });
  it("should login to the system", async () => {
    inputs = {
      email: "derya@twzhhq.online",
      password: "123456Abc",
      __type: "Customer",
    };
    result = await ClientService.loginService(inputs);
    expect(result).to.have.property("tokenCode");
  });
});

describe("Vendor loginService()", () => {
  it("should not be able to login", async () => {
    inputs = {
      email: "abc@test2.com",
      password: "ABC12345a",
      __type: "Vendor",
    };
    try {
      result = await ClientService.loginService(inputs);
    } catch (error) {
      expect(error).to.include({ code: 10 });
    }
  });
  it("should login to the system", async () => {
    inputs = {
      email: "testuser2@test2.com",
      password: "123456Abc",
      __type: "Vendor",
    };
    result = await ClientService.loginService(inputs);
    expect(result).to.have.property("tokenCode");
  });
});

describe("Customer logoutService()", () => {
  it("should not be able to logout", async () => {
    inputs = {
      tokenCode: "13b8d45290833fd6ed151a9f2",
    };
    try {
      result = await ClientService.logoutService(inputs);
    } catch (error) {
      expect(error).to.include({ code: 5 });
    }
  });
  it("should be able to logout from the system", async () => {
    inputs = {
      tokenCode: "1612103506501709301c478126aa53b8d45290833fd6ed151a9f2",
    };
    result = await ClientService.logoutService(inputs);
    expect(result).to.deep.equal({});
  });
});

describe("Vendor logoutService()", () => {
  it("should not be able to logout", async () => {
    inputs = {
      tokenCode: "13b8d45290833fd6ed151a9f2",
    };
    try {
      result = await ClientService.logoutService(inputs);
    } catch (error) {
      expect(error).to.include({ code: 10 });
    }
  });
  it("should be able to logout from the system", async () => {
    inputs = {
      tokenCode: "161210350673083a8e3e91350e2d915429d061382c48f1121e9c0",
    };
    result = await ClientService.logoutService(inputs);
    expect(result).to.deep.equal({});
  });
});
