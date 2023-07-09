const vscode = require("vscode");
const { CoAuthor } = require("../co-author-tree-provider/co-authors");
const { saveNewCoAuthors } = require("git-mob-core");
const { GitExt } = require("../vscode-git-extension/git-ext");

async function quickPickAuthors(repoAuthors) {
  const gitExt = new GitExt();
  const authorTextArray = repoAuthors.map((author) => {
    let icon = "";
    let type = "RepoAuthor";
    if (author instanceof CoAuthor) {
      icon = "$(star-full)";
      type = "CoAuthor";
    }
    return {
      label: `${icon}${author.name} <${author.email}>`,
      description: gitExt.selectedFolderName,
      repoAuthor: { ...author, type, key: author.commandKey },
      picked: author.selected,
    };
  });
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
  const { coAuthorGroups } = coAuthorProvider;
  return vscode.commands.registerCommand(
    "gitmob.addFromFavourite",
    async function () {
      const contributors = await coAuthorGroups.getGitRepoAuthors();

      const selectedAuthors = await quickPickAuthors([
        ...coAuthorGroups.getSelected(),
        ...coAuthorGroups.getUnselected(),
        ...contributors,
      ]);

      if (selectedAuthors && selectedAuthors.length > 0) {
        const authors = selectedAuthors.map((author) => author.repoAuthor);
        const anyRepoAuthors = authors.filter(
          (author) => author.type === "RepoAuthor"
        );
        if (anyRepoAuthors.length > 0) {
          await saveNewCoAuthors(anyRepoAuthors);
          coAuthorGroups.addNew(
            anyRepoAuthors.map(
              (author) =>
                new CoAuthor(author.name, author.email, false, author.key)
            )
          );
        }
        coAuthorGroups.select(authors);
        coAuthorProvider.reloadData();
      }
    }
  );
}

exports.addCoAuthor = addCoAuthor;
exports.removeCoAuthor = removeCoAuthor;
exports.addFromFavourite = addFromFavourite;
