const vscode = require("vscode");

function reloadCommand({ coAuthorProvider }) {
  return vscode.commands.registerCommand("gitmob.reload", function () {
    coAuthorProvider.mobAuthors.reset();
    coAuthorProvider.reloadData();
  });
}

exports.reloadCommand = reloadCommand;
