const vscode = require("vscode");
// const { addNewCoAuthor } = require("../git/git-mob-api");
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
  const { mobAuthors } = coAuthorProvider;
  return vscode.commands.registerCommand(
    "gitmob.addCoAuthor",
    async function (author) {
      if (author) {
        return coAuthorProvider.toggleCoAuthor(author, true);
      }
      await mobAuthors.listCurrent();
      const allSavedAuthors = await mobAuthors.listAll();
      // const repoAuthors = await mobAuthors.repoAuthorList();
      const authorItem = await quickPickAuthors([
        ...allSavedAuthors,
        // ...repoAuthors,
      ]);
      if (authorItem) {
        await mobAuthors.setCurrent(
          authorItem.map((author) => author.repoAuthor),
          true
        );
        await vscode.commands.executeCommand("gitmob.reload");
      }
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
