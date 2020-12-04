const request = require("request");
const { sha256 } = require("../../util/baseUtil");
const Config = require("../../config");
let baseUrl = `http://localhost:8080/`;
let loginUrl = baseUrl + "customer/login?";
let changePasswordUrl = baseUrl + "customer/changePassword?";

test("Change password successful", async () => {
  let email = "vatam60173@hmnmw.com";
  let password = "default";
  let newPassword = "asddsa";
  let newPasswordRepeat = "asddsa";
  let type = "Customer";
  let token = "";
  request(
    {
      url: `${loginUrl}email=${email}&password=${password}&type=${type}`,
      method: "POST",
    },
    (error, response, body) => {
      const statusCode = response && response.statusCode;
      body = JSON.parse(body);
      expect(statusCode).toEqual(200);
      expect(body).toHaveProperty("tokenCode");
      expect(body).toHaveProperty("client");
      token = body.tokenCode;
    }
  );
  request(
    {
      url: `${changePasswordUrl}oldPassword=${password}&newPassword=${newPassword}&newPasswordRepeat=${newPasswordRepeat}&tokenCode=${token}`,
      method: "POST",
    },
    (error, response, body) => {
      const statusCode = response && response.statusCode;
    }
  );
});
