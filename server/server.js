const http = require("http");
const https = require("https");
require("dotenv").config();
const querystring = require("querystring");

const PORT = 5005;
const ipUrl = "https://api.ipify.org?format=json";
const IPFY_API_KEY = process.env.ipfy_api_key;
const getLocationLink = `https://geo.ipify.org/api/v1?apiKey=${IPFY_API_KEY}`;

const getGetLocationByIPLink = (ip) => {
  return `${getLocationLink}&ipAddress=${ip}`;
};

const getGetLocationByDomainLink = (domain) => {
  return `${getLocationLink}&domain=${domain}`;
};

const sendJson = (res, code, data) => {
  res.writeHead(code, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(data));
};

const httpHandler = (req, res) => {
  const url = req.url;
  console.log(url);

  if (url === "/getMyIP") {
    getData(ipUrl, (data) => sendJson(res, 200, data));
  } else if (req.url.includes("/getLocation")) {
    const urlQuery = querystring.parse(url.substr(url.indexOf("?") + 1));

    console.log("query: ", urlQuery);

    const { ipAddress, domain } = urlQuery;

    console.log("ipAddress: ", ipAddress);
    console.log("domain: ", domain);

    let link = ipAddress
      ? getGetLocationByIPLink(ipAddress)
      : getGetLocationByDomainLink(domain);

    getData(link, (data) => sendJson(res, 200, data));
  }
};

http
  .createServer(httpHandler)
  .listen(PORT, () => console.log(`listening on port ${PORT}...`));

function getData(url, cb) {
  https
    .get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        cb(data);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}
