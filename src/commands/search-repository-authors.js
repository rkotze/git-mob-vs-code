const vscode = require("vscode");
const { addRepoAuthor } = require("../git/commands");

function extractEmail(authorText) {
  const emailMatch = /<([a-zA-Z0-9_\-\.\+]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5})>/;
  const [, email] = authorText.match(emailMatch);
  return email;
}

function searchRepositoryUsers({ coAuthorProvider }) {
  const { context, mobAuthors } = coAuthorProvider;
  let disposableAddRepoAuthor = vscode.commands.registerCommand(
    "gitmob.searchRepositoryUsers",
    async function() {
      const repoAuthors = await mobAuthors.repoAuthorList();
      const authorStr = await quickPickAuthors(repoAuthors);
      if (authorStr) {
        const selectedRepoAuthor = findSelectedAuthor(authorStr, repoAuthors);

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

function findSelectedAuthor(authorStr, repoAuthors) {
  const authorEmail = extractEmail(authorStr);
  return repoAuthors.find(author => author.email === authorEmail);
}

async function quickPickAuthors(repoAuthors) {
  const authorTextArray = repoAuthors.map(
    author => `${author.name} <${author.email}>`
  );
  return await vscode.window.showQuickPick(authorTextArray);
}
