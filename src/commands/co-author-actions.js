const vscode = require("vscode");

function addCoAuthor({ coAuthorProvider }) {
  return vscode.commands.registerCommand("gitmob.addCoAuthor", function (
    author
  ) {
    coAuthorProvider.toggleCoAuthor(author, true);
  });
}

function removeCoAuthor({ coAuthorProvider }) {
  return vscode.commands.registerCommand("gitmob.removeCoAuthor", function (
    author
  ) {
    coAuthorProvider.toggleCoAuthor(author, false);
  });
}

exports.addCoAuthor = addCoAuthor;
exports.removeCoAuthor = removeCoAuthor;
