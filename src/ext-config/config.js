const { workspace, commands } = require("vscode");

function getGitHubPat() {
  const gitHubSettings = workspace.getConfiguration("gitMob.gitHub");
  return gitHubSettings.get("personalAccessToken");
}

function getConfigSolo() {
  const config = workspace.getConfiguration("gitMob.postCommit");
  return config.get("solo");
}

function getSortDirection() {
  const config = workspace.getConfiguration("gitMob.coAuthors");
  return config.get("sortDirection");
}

function moveToCoAuthoring() {
  const authorListConfig = workspace.getConfiguration("gitMob.authorList");
  return authorListConfig.get("moreAuthorsToCo-authoring");
}

workspace.onDidChangeConfiguration((evt) => {
  if (evt.affectsConfiguration("gitMob.coAuthors.sortDirection")) {
    commands.executeCommand("gitmob.reload");
  }
});

exports.getGitHubPat = getGitHubPat;
exports.getConfigSolo = getConfigSolo;
exports.getSortDirection = getSortDirection;
exports.moveToCoAuthoring = moveToCoAuthoring;
