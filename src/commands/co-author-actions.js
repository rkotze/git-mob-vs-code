const vscode = require("vscode");
const { CoAuthor } = require("../co-author-tree-provider/co-authors");
const { GitExt } = require("../vscode-git-extension/git-ext");

async function quickPickAuthors(repoAuthors) {
  const gitExt = new GitExt();
  const authorTextArray = repoAuthors.map((author) => ({
    label: `${author.name} <${author.email}>`,
    description: gitExt.selectedFolderName,
    repoAuthor: { ...author, key: author.commandKey },
    picked: author.selected,
  }));
  return vscode.window.showQuickPick(authorTextArray, { canPickMany: true });
}

function addCoAuthor({ coAuthorProvider }) {
  return vscode.commands.registerCommand(
    "gitmob.addCoAuthor",
    async function (author) {
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

function addFromFavourite({ coAuthorProvider }) {
  const { mobAuthors } = coAuthorProvider;
  return vscode.commands.registerCommand(
    "gitmob.addFromFavourite",
    async function () {
      await mobAuthors.listCurrent();
      const allSavedAuthors = await mobAuthors.listAll();
      const authorItem = await quickPickAuthors(allSavedAuthors);
      if (authorItem) {
        await mobAuthors.set(authorItem.map((author) => author.repoAuthor));
        await vscode.commands.executeCommand("gitmob.reload");
      }
    }
  );
}

exports.addCoAuthor = addCoAuthor;
exports.removeCoAuthor = removeCoAuthor;
exports.addFromFavourite = addFromFavourite;
