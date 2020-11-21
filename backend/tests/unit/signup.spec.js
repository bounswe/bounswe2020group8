const request = require("request");
const random = require('random')

let baseUrl = `http://localhost:8080/`;
let signupUrl = baseUrl + "client/signup?";
test("signup without passwordConfirm", async () => {
  let email = "mty@test.com";
  let password = "testermty1234";
  let type = "CLIENT";
  request(
    {
      url: `${signupUrl}email=${email}&password=${password}&type=${type}`,
      method: "POST"
    },
    (error, response) => {
      const statusCode = response && response.statusCode;
      expect(statusCode).toEqual(400);
    }
  );
});

test("Successful signup", async () => {
  let rand = (random.int(min = 1, max = 999999)).toString();
  let email = `test${rand}@gmail.com`;
  let password = "testtest2";
  let passwordConfirm = "testtest2"
  let type = "CLIENT";
  request(
    {
      url: `${signupUrl}email=${email}&password=${password}&type=${type}&passwordConfirm=${passwordConfirm}`,
      method: "POST"
    },
    (error, response, body) => {
      const statusCode = response && response.statusCode;
      body = JSON.parse(body);
      expect(statusCode).toEqual(200);
      expect(body).toHaveProperty("client");
    }
  );
});
