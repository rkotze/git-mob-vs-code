const { getGitHubPat } = require("../ext-config/config");
const { fetch } = require("./fetch");

const GITHUB_API = "https://api.github.com/";

async function get(url) {
  const pat = getGitHubPat();
  let headers = {
    Accept: "application/vnd.github.v3+json",
  };
  if (pat) {
    headers.Authorization = `token ${pat}`;
  }

  const gitUrl = new URL(url, GITHUB_API);
  const { statusCode, data } = await fetch(gitUrl, {
    method: "GET",
    headers,
  });

  return {
    statusCode,
    data: JSON.parse(data),
  };
}

exports.get = get;
