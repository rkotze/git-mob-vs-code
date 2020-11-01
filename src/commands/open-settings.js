const vscode = require("vscode");

function openSettings() {
  return vscode.commands.registerCommand("gitmob.openSettings", function () {
    vscode.commands.executeCommand("workbench.action.openSettings", "gitmob");
  });
}

exports.openSettings = openSettings;
