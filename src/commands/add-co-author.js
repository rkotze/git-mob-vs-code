const vscode = require("vscode");
const { addRepoAuthor } = require("../git/commands");

function addRepoAuthorToCoauthors({ coAuthorProvider }) {
  const { context } = coAuthorProvider;
  let disposableAddRepoAuthor = vscode.commands.registerCommand(
    "gitmob.addRepoAuthorToCoAuthors",
    function(author) {
      addRepoAuthor(author);
      vscode.commands.executeCommand("gitmob.reload");
    }
  );

  context.subscriptions.push(disposableAddRepoAuthor);
}

exports.addRepoAuthorToCoauthors = addRepoAuthorToCoauthors;
