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

const ENABLE_INPUT_AUTOCOMPLETION =
  "gitmob.scmTextbox.enableInputAutocompletion";

function getInputCompletionConfig() {
  const config = workspace.getConfiguration("gitmob.scmTextbox");
  return config.get("enableInputAutocompletion");
}

workspace.onDidChangeConfiguration((evt) => {
  if (evt.affectsConfiguration("gitMob.coAuthors.sortDirection")) {
    commands.executeCommand("gitmob.reload");
  }
});

exports.getConfigSolo = getConfigSolo;
exports.getSortDirection = getSortDirection;
exports.moveToCoAuthoring = moveToCoAuthoring;
exports.ENABLE_INPUT_AUTOCOMPLETION = ENABLE_INPUT_AUTOCOMPLETION;
exports.getInputCompletionConfig = getInputCompletionConfig;
