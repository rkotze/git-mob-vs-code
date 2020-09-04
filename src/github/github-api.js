const { fetch } = require("./fetch");

const GITHUB_API = "https://api.github.com/";

async function get(path) {
  try {
    const result = await fetch(GITHUB_API + path, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: "token <tokenhere>",
      },
    });

    return {
      data: JSON.parse(result),
    };
  } catch (err) {
    console.log(err);
  }
}

exports.get = get;
