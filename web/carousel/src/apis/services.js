const BASE_URL = "http://18.198.51.178:8080";

function objectToQueryString(obj) {
  if (typeof obj !== "object") return "";

  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p) && obj[p]) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&") ? "?" + str.join("&") : "";
}

async function doFetch(endpoint, options = {}) {
  const { body, method = "GET", headers = {}, query } = options;

  const fullApiPath = BASE_URL + endpoint + objectToQueryString(query);

  const fetchOptions = {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    method,
    body,
  };

  if (method === "POST" || method === "PATCH") {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(fullApiPath, fetchOptions);
  const data = await response.json();
  return data;
}

export async function GET(endpoint, query = {}) {
  const data = await doFetch(endpoint, { query });
  return data;
}

export async function POST(endpoint, body = {}, query) {
  const data = await doFetch(endpoint, { body, query, method: "POST" });
  return data;
}
