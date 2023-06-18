const vscode = require("vscode");
const { moveToCoAuthoring } = require("../ext-config/config");
const { saveNewCoAuthors } = require("git-mob-core");
const { GitExt } = require("../vscode-git-extension/git-ext");

function searchRepositoryUsers({ coAuthorProvider }) {
  const { mobAuthors } = coAuthorProvider;
  return vscode.commands.registerCommand(
    "gitmob.searchRepositoryUsers",
    async function () {
      const repoAuthors = await mobAuthors.repoAuthorList();
      const authorItem = await quickPickAuthors(repoAuthors);
      if (authorItem) {
        await saveNewCoAuthors([authorItem.repoAuthor]);
        if (moveToCoAuthoring()) {
          updateAuthorUiList(coAuthorProvider, authorItem.repoAuthor);
        }
        await vscode.commands.executeCommand("gitmob.reload");
      }
    }
  );
}

exports.searchRepositoryUsers = searchRepositoryUsers;

async function updateAuthorUiList(coAuthorProvider, author) {
  coAuthorProvider.mobAuthors.reset();
  await coAuthorProvider.mobAuthors.listCurrent();
  await coAuthorProvider.toggleCoAuthor(author, true);
}

async function quickPickAuthors(repoAuthors) {
  const gitExt = new GitExt();
  const authorTextArray = repoAuthors.map((author) => ({
    label: `${author.name} <${author.email}>`,
    description: gitExt.selectedFolderName,
    repoAuthor: { ...author, key: author.commandKey },
  }));
  return await vscode.window.showQuickPick(authorTextArray);
}
