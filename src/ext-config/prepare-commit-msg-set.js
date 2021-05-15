const { workspace } = require("vscode");

function prepareCommitMsgSet() {
  const hookSettings = workspace.getConfiguration("gitMob.hooks");
  return hookSettings.get("prepareCommitMsg");
}

exports.prepareCommitMsgSet = prepareCommitMsgSet;
