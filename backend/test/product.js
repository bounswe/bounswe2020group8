require("./testDatabaseReset");

const mongooseConfig = require("../mongoose_config");
const ProductService = require("../services/product");
const chai = require("chai");
const expect = chai.expect;
const Config = require("../config");
const Product = require("../models/product");
const mongoose = require("mongoose");

if (Config.env == "test") {
  mongooseConfig.connect(Config);
} else {
  console.log("ENVIRONMENT IS NOT TEST");
  return 1;
}

describe(" searchProductService()", () => {
  before(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
  after(() => {});
  beforeEach(() => {});
  afterEach(() => {});
  it("it should search for a product", async () => {
    inputs = {
      query: "",
      tags: ["tablet"],
    };
    result = await ProductService.searchProductsService(inputs);

    expect(result.results).to.be.above(0);
    expect(result.data).to.have.lengthOf.above(0);
  });
});

describe(" getSearchFiltersService()", () => {
  before(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
  after(() => {});
  beforeEach(() => {});
  afterEach(() => {});
  it("it should get search filters for a query", async () => {
    inputs = {
      query: "",
      tags: ["tablet"],
    };
    result = await ProductService.getSearchFiltersService(inputs);
    expect(result.data).to.have.keys(
      "_id",
      "parameters",
      "maxPrice",
      "minPrice",
      "vendors",
      "brands",
      "categories"
    );
  });
});

describe(" addVendorToProductService()", () => {
  before(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
  after(() => {});
  beforeEach(() => {});
  afterEach(() => {});
  it("it should add vendor the the product", async () => {
    inputs = {
      pid: "6016709dcce630376a770b43",
      vendorData: {
        vendorID: "60166169b8d9852d99890afd",
        price: 3000,
        amountLeft: 15,
        shipmentPrice: 15,
        cargoCompany: "PTT",
      },
    };
    await ProductService.addVendorToProductService(inputs);
    await new Promise((resolve) => setTimeout(resolve, 150));

    product = await Product.findOne({ _id: "6016709dcce630376a770b43" });
    vendorSpecific = product.vendorSpecifics.find(
      (el) => el.vendorID.toString() == "60166169b8d9852d99890afd"
    );
    expect(vendorSpecific).to.deep.include({
      vendorID: mongoose.Types.ObjectId("60166169b8d9852d99890afd"),
      price: 3000,
      amountLeft: 15,
      shipmentPrice: 15,
      cargoCompany: "PTT",
    });
  });
});

describe(" deleteVendorFromProductService()", () => {
  it("it should delete vendor from the product", async () => {
    inputs = {
      pid: "601670a8cce630376a770b47",
      vid: "60166169b8d9852d99890afd",
    };
    result = await ProductService.deleteVendorFromProductService(inputs);
    await new Promise((resolve) => setTimeout(resolve, 150));

    product = await Product.findOne({ _id: "601670a8cce630376a770b47" });
    expect(product.vendorSpecifics.map((el) => el.vendorID)).to.not.have.members([
      mongoose.Types.ObjectId("60166169b8d9852d99890afd"),
    ]);
  });
});

describe(" updateVendorInProductService()", () => {
  it("it should update vendor's data in the product", async () => {
    inputs = {
      pid: "601670a8cce630376a770b47",
      vid: "6016701fcce630376a770b3e",
      vendorData: {
        vendorID: "6016701fcce630376a770b3e",
        price: 5000,
        amountLeft: 15,
        shipmentPrice: 15,
        cargoCompany: "UPStest",
      },
    };
    result = await ProductService.updateVendorInProductService(inputs);
    await new Promise((resolve) => setTimeout(resolve, 150));

    product = await Product.findOne({ _id: "601670a8cce630376a770b47" });
    vendorSpecific = product.vendorSpecifics.find((el) => {
      return el.vendorID.toString() == "6016701fcce630376a770b3e";
    });
    expect(vendorSpecific).to.deep.include({ price: 5000, cargoCompany: "UPStest" });
  });
});

describe(" createProductService()", () => {
  it("it should create a new product ", async () => {
    inputs = {
      tags: ["computer", "256gb", "yellow", "monster", "electronics"],
      photos: ["url1", "url2"],
      parameters: [
        { name: "size", value: "256GB" },
        { name: "color", value: "yellow" },
      ],
      vendorSpecifics: [
        {
          vendorID: "600e8cdf61dde8365eec6421",
          price: 2500,
          amountLeft: 15,
          shipmentPrice: 15,
          cargoCompany: "PTT",
        },
      ],
      parentProduct: "60167074cce630376a770b40",
      default: {
        vendorID: "600e8cdf61dde8365eec6421",
        price: 2500,
        amountLeft: 15,
        shipmentPrice: 15,
        cargoCompany: "PTT",
      },
      brand: "Monster",
      category: "electronics",
    };
    result = await ProductService.createProductService({ product: inputs });
    expect(result.data).to.deep.include({
      parentProduct: mongoose.Types.ObjectId("60167074cce630376a770b40"),
      photos: ["url1", "url2"],
      brand: "Monster",
      category: "electronics",
    });
  });
});

describe(" getAllProductsService()", () => {
  it("it should return all products of a specific vendor", async () => {
    inputs = {
      query: { "vendorSpecifics.vendorID": "600e8cdf61dde8365eec6421" },
    };
    result = await ProductService.getAllProductsService(inputs);
    expect(result.results).to.be.above(3);
  });
});
