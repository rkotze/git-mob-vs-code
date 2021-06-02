const { workspace } = require("vscode");

function getGitHubPat() {
  const gitHubSettings = workspace.getConfiguration("gitMob.gitHub");
  return gitHubSettings.get("personalAccessToken");
}

function getConfigSolo() {
  const config = workspace.getConfiguration("gitMob.postCommit");
  return config.get("solo");
}

exports.getGitHubPat = getGitHubPat;
exports.getConfigSolo = getConfigSolo;
