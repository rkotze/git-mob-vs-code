const vscode = require("vscode");

function openSettings() {
  return vscode.commands.registerCommand("gitmob.openSettings", function () {
    openSettingsExecute;
  });
}

function openSettingsExecute() {
  vscode.commands.executeCommand(
    "workbench.action.openSettings",
    "@ext:richardkotze.git-mob"
  );
}

exports.openSettings = openSettings;
exports.openSettingsExecute = openSettingsExecute;
