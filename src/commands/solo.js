const vscode = require("vscode");
const { mob } = require("../git/commands");

function soloCommand({ coAuthorProvider }) {
  return vscode.commands.registerCommand("gitmob.solo", function () {
    mob.solo();
    coAuthorProvider.reloadData();
  });
}

exports.soloCommand = soloCommand;
