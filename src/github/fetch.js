const https = require("https");

const USER_AGENT = { "User-Agent": "vs-code-git-mob" };

function fetch(url, options) {
  options.headers = updateHeaders(options.headers);
  return new Promise(function (fulfil, reject) {
    const req = https
      .request(url, options, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          fulfil(data);
        });
      })
      .on("error", (error) => {
        reject(error);
      });

    req.end();
  });
}

function updateHeaders(headers) {
  if (headers) {
    return {
      ...headers,
      ...USER_AGENT,
    };
  }

  return USER_AGENT;
}

exports.fetch = fetch;
