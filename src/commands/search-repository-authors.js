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
        const selectedRepoAuthor = findSelectedAuthor(authorItem, repoAuthors);

        if (selectedRepoAuthor) {
          addRepoAuthor(selectedRepoAuthor);
          await vscode.commands.executeCommand("gitmob.reload");
          coAuthorProvider.toggleCoAuthor(selectedRepoAuthor, true);
        }
      }
    }
  );

  context.subscriptions.push(disposableAddRepoAuthor);
}

exports.searchRepositoryUsers = searchRepositoryUsers;

function findSelectedAuthor(authorItem, repoAuthors) {
  return repoAuthors.find(author => author.email === authorItem.description);
}

async function quickPickAuthors(repoAuthors) {
  const authorTextArray = repoAuthors.map(author => ({
    label: author.name,
    description: author.email
  }));
  return await vscode.window.showQuickPick(authorTextArray);
}
