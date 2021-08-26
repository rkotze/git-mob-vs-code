const vscode = require("vscode");
const { addNewCoAuthor } = require("../git/git-mob-api");
const { GitExt } = require("../vscode-git-extension/git-ext");

function searchRepositoryUsers({ coAuthorProvider }) {
  const { mobAuthors } = coAuthorProvider;
  return vscode.commands.registerCommand(
    "gitmob.searchRepositoryUsers",
    async function () {
      const repoAuthors = await mobAuthors.repoAuthorList();
      const authorItem = await quickPickAuthors(repoAuthors);
      if (authorItem) {
        await addNewCoAuthor(authorItem.repoAuthor);
        await vscode.commands.executeCommand("gitmob.reload");
      }
    }
  );
}

exports.searchRepositoryUsers = searchRepositoryUsers;

async function quickPickAuthors(repoAuthors) {
  const gitExt = new GitExt();
  const authorTextArray = repoAuthors.map((author) => ({
    label: `${author.name} <${author.email}>`,
    description: gitExt.selectedFolderName,
    repoAuthor: { ...author, key: author.commandKey },
  }));
  return await vscode.window.showQuickPick(authorTextArray);
}
