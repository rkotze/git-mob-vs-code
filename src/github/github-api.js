const { workspace } = require("vscode");
const { fetch } = require("./fetch");

const GITHUB_API = "https://api.github.com/";

async function get(url) {
  const gitHubSettings = workspace.getConfiguration("gitMob.gitHub");
  const pat = gitHubSettings.get("personalAccessToken");
  if (!pat) {
    throw new Error("No GitHub personal access token found");
  }
  const gitUrl = new URL(url, GITHUB_API);
  const result = await fetch(gitUrl, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${pat}`,
    },
  });

  return {
    data: JSON.parse(result),
  };
}

exports.get = get;
