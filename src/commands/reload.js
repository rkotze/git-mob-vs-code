const vscode = require("vscode");

function reloadCommand({ coAuthorProvider }) {
  let disposable = vscode.commands.registerCommand("gitmob.reload", function() {
    coAuthorProvider.mobAuthors.reset();
    coAuthorProvider.reloadData();
  });
  coAuthorProvider.context.subscriptions.push(disposable);
}

exports.reloadCommand = reloadCommand;
