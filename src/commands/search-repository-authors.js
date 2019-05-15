const vscode = require("vscode");
const { addRepoAuthor } = require("../git/commands");

function searchRepositoryUsers({ coAuthorProvider }) {
  const { context, mobAuthors } = coAuthorProvider;
  let disposableAddRepoAuthor = vscode.commands.registerCommand(
    "gitmob.searchRepositoryUsers",
    async function() {
      const repoAuthors = await mobAuthors.repoAuthorList();
      const authorItem = await quickPickAuthors(repoAuthors);
      if (authorItem) {
        addRepoAuthor(authorItem.repoAuthor);
        await vscode.commands.executeCommand("gitmob.reload");
        coAuthorProvider.toggleCoAuthor(authorItem.repoAuthor, true);
      }
    }
  );

  context.subscriptions.push(disposableAddRepoAuthor);
}

exports.searchRepositoryUsers = searchRepositoryUsers;

async function quickPickAuthors(repoAuthors) {
  const authorTextArray = repoAuthors.map(author => ({
    label: author.name,
    description: author.email,
    repoAuthor: author
  }));
  return await vscode.window.showQuickPick(authorTextArray);
}
