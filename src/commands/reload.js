const vscode = require("vscode");

function reloadCommand({ coAuthorProvider }) {
  return vscode.commands.registerCommand("gitmob.reload", async function () {
    await coAuthorProvider.coAuthorGroups.reloadData();
    coAuthorProvider.reloadData();
  });
}

exports.reloadCommand = reloadCommand;
