require("./testDatabaseReset");

const mongooseConfig = require("../mongoose_config");
const ListService = require("../services/list");
const chai = require("chai");
const expect = chai.expect;
const Config = require("../config");

if (Config.env == "test") {
  mongooseConfig.connect(Config);
} else {
  console.log("ENVIRONMENT IS NOT TEST");
  return 1;
}

describe(" createAListOfACustomer()", () => {
  before(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
  after(() => {});
  beforeEach(() => {});
  afterEach(() => {});
  it("it should create a comment of a product", async () => {
    result = await ListService.createOneListService(
      "My Second List",
      [
        {
          _id: "6016e33228e37485bdfe8fb1",
          productId: "60165ad88f88f5252633eb85",
          vendorId: "600e8cdf61dde8365eec6421",
        },
      ],
      { _id: "5fea808e161e5428c3caa3c5" }
    );

    expect(result.results).to.be.above(0);
    expect(result.data).to.have.lengthOf.above(0);
  });
});
