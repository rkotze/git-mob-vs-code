const vscode = require("vscode");
const { mob } = require("../git/commands");

function soloCommand() {
  return vscode.commands.registerCommand("gitmob.solo", function () {
    mob.removeGitMobSection();
    vscode.commands.executeCommand("gitmob.reload");
  });
}

exports.soloCommand = soloCommand;
