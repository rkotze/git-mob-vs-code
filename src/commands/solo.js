const vscode = require("vscode");
const { solo } = require("../git/git-mob-api");

function soloCommand() {
  return vscode.commands.registerCommand("gitmob.solo", function () {
    solo();
    vscode.commands.executeCommand("gitmob.reload");
  });
}

exports.soloCommand = soloCommand;
