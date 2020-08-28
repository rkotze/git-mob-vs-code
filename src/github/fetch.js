const https = require("https");

function fetch(path) {
  return new Promise(function (fulfil, reject) {
    https
      .get(
        "https://api.github.com/" + path,
        {
          headers: {
            "User-Agent": "vs-code-git-mob",
            Accept: "application/vnd.github.v3+json",
            Authorization: "token <tokenhere>",
          },
        },
        (response) => {
          let data = "";

          response.on("data", (chunk) => {
            data += chunk;
          });

          response.on("end", () => {
            fulfil(data);
          });
        }
      )
      .on("error", (error) => {
        reject(error);
      });
  });
}

exports.fetch = fetch;
