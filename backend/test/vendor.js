require("./testDatabaseReset");

const mongooseConfig = require("../mongoose_config");
const VendorService = require("../services/vendor");
const chai = require("chai");
const expect = chai.expect;
const Config = require("../config");
const Vendor = require("../models/vendor");
const mongoose = require("mongoose");

if (Config.env == "test") {
  mongooseConfig.connect(Config);
} else {
  console.log("ENVIRONMENT IS NOT TEST");
  return 1;
}

describe("signup signupService()", () => {
  it("should not be able to create a new vendor in database", async () => {
    inputs = {
      email: "test@test123.com",
      password: "ABC12345a",
      name: "test1",
      lastName: "test2",
      companyName: "testCompany",
      companyDomainName: "testCompany.com",
      locations: [{ latitude: 1, longitude: 2 }],
    };
    try {
      result = await VendorService.signupService(inputs);
    } catch (error) {
      expect(error).to.include({ code: 9 });
    }
  });
  it("should create a new vendor in database", async () => {
    inputs = {
      email: "test_vendor_pass@test123.com",
      password: "ABC12345a",
      name: "test1",
      lastName: "test2",
      companyName: "testCompany",
      companyDomainName: "testCompany.com",
      locations: [{ latitude: 1, longitude: 2 }],
    };
    result = await VendorService.signupService(inputs);
    vendor = await Vendor.findOne({ email: "test_vendor_pass@test123.com" });
    expect(vendor).to.include({ email: "test_vendor_pass@test123.com" });
    expect(vendor.password).to.not.equal("ABC12345a"); // because of hashing
  });
});

describe("getAllMyMainProductsService()", () => {
  it("should return all main products of the vendor", async () => {
    inputs = {
      vid: mongoose.Types.ObjectId("600e8cdf61dde8365eec6421"),
    };
    result = await VendorService.getAllMyMainProductsService(inputs);
    expect(result.results).to.equal(3);
  });
});

describe("getAllMyProductsService()", () => {
  it("should return all products of the vendor", async () => {
    inputs = {
      vid: mongoose.Types.ObjectId("600e8cdf61dde8365eec6421"),
    };
    result = await VendorService.getAllMyProductsService(inputs);
    expect(result.results).to.be.above(3);
  });
});

describe("getMyProductService()", () => {
  it("should return a product of the vendor", async () => {
    inputs = {
      vid: mongoose.Types.ObjectId("600e8cdf61dde8365eec6421"),
      pid: mongoose.Types.ObjectId("60165b378f88f5252633eb89"),
    };
    result = await VendorService.getMyProductService(inputs);
    expect(result.data[0]).to.deep.include({
      _id: mongoose.Types.ObjectId("60165b378f88f5252633eb89"),
      brand: "Apple",
    });
  });
});

describe("updateMyProductService()", () => {
  it("should create a product request for updating product", async () => {
    inputs = {
      vid: mongoose.Types.ObjectId("600e8cdf61dde8365eec6421"),
      pid: mongoose.Types.ObjectId("60165b378f88f5252633eb89"),
      data: {
        vendorSpecifics: {
          _id: "60165b378f88f5252633eb8c",
          vendorID: "600e8cdf61dde8365eec6421",
          price: 500,
          amountLeft: 25,
          shipmentPrice: 15,
          cargoCompany: "Test Cargo",
        },
      },
    };
    result = await VendorService.updateMyProductService(inputs);
    expect(result.data).to.deep.include({
      type: "UPDATE_PRODUCT",
      status: "PENDING",
      oldValue: mongoose.Types.ObjectId("60165b378f88f5252633eb89"),
    });
  });
});

describe("deleteMyProductService()", () => {
  it("should create a product request for deleting a product", async () => {
    inputs = {
      vid: mongoose.Types.ObjectId("600e8cdf61dde8365eec6421"),
      pid: mongoose.Types.ObjectId("60165b378f88f5252633eb89"),
    };
    result = await VendorService.deleteMyProductService(inputs);
    expect(result.data).to.deep.include({
      type: "DELETE_PRODUCT",
      status: "PENDING",
      oldValue: mongoose.Types.ObjectId("60165b378f88f5252633eb89"),
    });
  });
});

describe("deleteMeFromMainProductService()", () => {
  it("should create a product request for deleting a vendor from a main products all products", async () => {
    inputs = {
      vid: mongoose.Types.ObjectId("600e8cdf61dde8365eec6421"),
      mpid: mongoose.Types.ObjectId("60165a978f88f5252633eb82"),
    };
    result = await VendorService.deleteMeFromMainProductService(inputs);
    expect(result.data).to.deep.include({
      type: "DELETE_MAIN_PRODUCT",
      status: "PENDING",
      oldValue: mongoose.Types.ObjectId("60165a978f88f5252633eb82"),
    });
  });
});

describe("addMeToExistingProductService()", () => {
  it("should create a product request for adding the vendor into an existing product", async () => {
    inputs = {
      vid: mongoose.Types.ObjectId("600e8cdf61dde8365eec6421"),
      pid: mongoose.Types.ObjectId("60166ddcdeb9ea352d8e64a7"),
      data: {
        vendorSpecifics: {
          vendorID: "600e8cdf61dde8365eec6421",
          price: 2000,
          amountLeft: 25,
          shipmentPrice: 15,
          cargoCompany: "Test Cargo",
        },
        photos: ["photo1"],
      },
    };
    result = await VendorService.addMeToExistingProductService(inputs);

    expect(result.data).to.deep.include({
      type: "ADD_EXISTING_PRODUCT",
      status: "PENDING",
      oldValue: mongoose.Types.ObjectId("60166ddcdeb9ea352d8e64a7"),
    });
  });
});

describe("createMyNewProductService()", () => {
  it("should create a product request for creating a new product for the vendor", async () => {
    inputs = {
      vid: mongoose.Types.ObjectId("600e8cdf61dde8365eec6421"),
      data: {
        vendorSpecifics: {
          vendorID: "600e8cdf61dde8365eec6421",
          price: 2000,
          amountLeft: 25,
          shipmentPrice: 15,
          cargoCompany: "Test Cargo",
        },
        photos: ["photo1"],
      },
    };
    result = await VendorService.createMyNewProductService(inputs);
    expect(result.data).to.deep.include({
      type: "ADD_NEW_PRODUCT",
      status: "PENDING",
      oldValue: null,
    });
  });
});

describe("getOneVendorPublicService()", () => {
  it("should return the public information of the vendor", async () => {
    inputs = {
      vid: mongoose.Types.ObjectId("600e8cdf61dde8365eec6421"),
      data: {
        vendorSpecifics: {
          vendorID: "600e8cdf61dde8365eec6421",
          price: 2000,
          amountLeft: 25,
          shipmentPrice: 15,
          cargoCompany: "Test Cargo",
        },
      },
      photos: ["photo1"],
    };
    result = await VendorService.getOneVendorPublicService(inputs);
    expect(result.data)
      .to.deep.include({
        _id: "600e8cdf61dde8365eec6421",
        companyName: "testCompany",
      })
      .and.not.have.property("name");
  });
});
