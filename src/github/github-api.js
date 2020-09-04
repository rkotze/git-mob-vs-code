const vscode = require("vscode");
const { fetch } = require("./fetch");

const GITHUB_API = "https://api.github.com/";

async function get(path) {
  const gitHubSettings = vscode.workspace.getConfiguration("gitMob.gitHub");
  const pat = gitHubSettings.get("personalAccessToken");
  if (!pat) {
    throw new Error("No GitHub personal access token found");
  }
  try {
    const result = await fetch(GITHUB_API + path, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${pat}`,
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
