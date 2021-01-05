const request = require("request");
let baseUrl = `http://localhost:8080/`;
let loginUrl = baseUrl + "client/login?";

test("Login without email", async () => {
  let email = "";
  let password = "test2";
  let type = "CLIENT";
  request(
    {
      url: `${loginUrl}email=${email}&password=${password}&type=${type}`,
      method: "POST",
    },
    (error, response) => {
      const statusCode = response && response.statusCode;
      expect(statusCode).toEqual(400);
    }
  );
});

test("Successful login", async () => {
  let email = "test@gmail.com";
  let password = "testtest2";
  let type = "CLIENT";
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
    }
  );
});
