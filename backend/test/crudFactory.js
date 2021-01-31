require("./testDatabaseReset");

const mongooseConfig = require("../mongoose_config");
const chai = require("chai");
const expect = chai.expect;
const factory = require("../services/crudFactory");

const Config = require("../config");
const ProductRequest = require("../models/productRequest");
const mongoose = require("mongoose");
if (Config.env == "test") {
  mongooseConfig.connect(Config);
} else {
  console.log("ENVIRONMENT IS NOT TEST");
  return 1;
}

describe(" CRUD ProductRequest getAll()", () => {
  it("it should return all product requests", async () => {
    req = { query: {} };
    result = await factory.getAll(ProductRequest)(req);
    expect(result.results).to.be.above(0);
    expect(result.data).to.have.lengthOf.above(0);
  });
});

describe(" CRUD ProductRequest getOne()", () => {
  it("it should return one product request", async () => {
    req = { query: {}, params: { id: "6016a5b4da58dc6cdca96653" } };
    result = await factory.getOne(ProductRequest)(req);
    expect(result.data.type).to.equal("UPDATE_PRODUCT");
    expect(result.data.status).to.equal("PENDING");
    expect(result.data._id).to.deep.equal(mongoose.Types.ObjectId("6016a5b4da58dc6cdca96653"));
  });
});

describe(" CRUD ProductRequest createOne()", () => {
  it("it should create one product request", async () => {
    req = {
      body: {
        _id: "6016a5b4da58dc6cdca96603",
        type: "UPDATE_PRODUCT",
        status: "PENDING",
        vendorID: "600e8cdf61dde8365eec6421",
        oldValue: "60165b378f88f5252633eb89",
        newValue: {
          vendorSpecifics: {
            _id: "60165b378f88f5252633eb8c",
            vendorID: "600e8cdf61dde8365eec6421",
            price: 1500,
            amountLeft: 56,
            shipmentPrice: 15,
            cargoCompany: "UPS Cargo",
          },
        },
        messageFromAdmin: null,
      },
    };
    result = await factory.createOne(ProductRequest)(req);
    expect(result.data.type).to.equal("UPDATE_PRODUCT");
    expect(result.data.status).to.equal("PENDING");
    expect(result.data._id).to.deep.equal(mongoose.Types.ObjectId("6016a5b4da58dc6cdca96603"));
  });
});

describe(" CRUD ProductRequest updateOne()", () => {
  it("it should update one product request", async () => {
    req = {
      body: {
        _id: "6016a5bada58dc6cdca92456",
        status: "APPROVED",
      },
      params: { id: "6016a5bada58dc6cdca92456" },
    };
    result = await factory.updateOne(ProductRequest)(req);
    expect(result.data.status).to.equal("APPROVED");
    expect(result.data._id).to.deep.equal(mongoose.Types.ObjectId("6016a5bada58dc6cdca92456"));
  });
});

describe(" CRUD ProductRequest deleteOne()", () => {
  it("it should delete one product request", async () => {
    req = {
      params: { id: "6016a5bada58dc6cdca92982" },
    };
    result = await factory.deleteOne(ProductRequest)(req);
    expect(result.data).to.equal(null);
  });
});
