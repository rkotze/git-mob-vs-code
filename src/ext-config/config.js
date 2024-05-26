const { workspace, commands } = require("vscode");

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

exports.getConfigSolo = getConfigSolo;
exports.getSortDirection = getSortDirection;
exports.moveToCoAuthoring = moveToCoAuthoring;
