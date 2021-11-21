const vscode = require("vscode");

function addCoAuthor({ coAuthorProvider }) {
  return vscode.commands.registerCommand(
    "gitmob.addCoAuthor",
    function (author) {
      return coAuthorProvider.toggleCoAuthor(author, true);
    }
  );
}

function removeCoAuthor({ coAuthorProvider }) {
  return vscode.commands.registerCommand(
    "gitmob.removeCoAuthor",
    function (author) {
      return coAuthorProvider.toggleCoAuthor(author, false);
    }
  );
}

exports.addCoAuthor = addCoAuthor;
exports.removeCoAuthor = removeCoAuthor;
