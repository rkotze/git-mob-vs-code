const vscode = require("vscode");
const { mob } = require("../git/commands");

function soloCommand({ coAuthorProvider }) {
  let disposableSolo = vscode.commands.registerCommand(
    "gitmob.solo",
    function() {
      mob.solo();
      coAuthorProvider.reloadData();
    }
  );
  coAuthorProvider.context.subscriptions.push(disposableSolo);
}

exports.soloCommand = soloCommand;
