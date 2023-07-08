const vscode = require("vscode");

function soloCommand({ coAuthorProvider }) {
  return vscode.commands.registerCommand("gitmob.solo", async function () {
    await coAuthorProvider.coAuthorGroups.solo();
    await vscode.commands.executeCommand("gitmob.reload");
  });
}

exports.soloCommand = soloCommand;
