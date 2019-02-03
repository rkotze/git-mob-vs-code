const vscode = require("vscode");

function addCoAuthor({ coAuthorProvider }) {
  const { context } = coAuthorProvider;
  let disposableAddCoAuthor = vscode.commands.registerCommand(
    "gitmob.addCoAuthor",
    function(author) {
      coAuthorProvider.toggleCoAuthor(author, true);
    }
  );

  context.subscriptions.push(disposableAddCoAuthor);
}

function removeCoAuthor({ coAuthorProvider }) {
  const { context } = coAuthorProvider;
  let disposableRemoveCoAuthor = vscode.commands.registerCommand(
    "gitmob.removeCoAuthor",
    function(author) {
      coAuthorProvider.toggleCoAuthor(author, false);
    }
  );

  context.subscriptions.push(disposableRemoveCoAuthor);
}

exports.addCoAuthor = addCoAuthor;
exports.removeCoAuthor = removeCoAuthor;
