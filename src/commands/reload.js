const vscode = require("vscode");

function reloadCommand({ coAuthorProvider }) {
  return vscode.commands.registerCommand("gitmob.reload", function () {
    coAuthorProvider.coAuthorGroups.reloadData();
    coAuthorProvider.reloadData();
  });
}

exports.reloadCommand = reloadCommand;
