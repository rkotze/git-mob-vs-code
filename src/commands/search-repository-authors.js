const vscode = require("vscode");
const { moveToCoAuthoring } = require("../ext-config/config");
const { saveNewCoAuthors } = require("git-mob-core");
const { GitExt } = require("../vscode-git-extension/git-ext");
const { CoAuthor } = require("../co-author-tree-provider/co-authors");

function searchRepositoryUsers({ coAuthorProvider }) {
  const { coAuthorGroups } = coAuthorProvider;
  return vscode.commands.registerCommand(
    "gitmob.searchRepositoryUsers",
    async function () {
      const repoAuthors = await coAuthorGroups.getGitRepoAuthors();
      const authorItem = await quickPickAuthors(repoAuthors);
      if (authorItem) {
        await saveNewCoAuthors([authorItem.repoAuthor]);
        const rAuthor = authorItem.repoAuthor;
        const coAuthor = new CoAuthor(
          rAuthor.name,
          rAuthor.email,
          false,
          rAuthor.commandKey
        );
        coAuthorProvider.coAuthorGroups.addNew([coAuthor]);
        if (moveToCoAuthoring()) {
          await coAuthorProvider.toggleCoAuthor(coAuthor, true);
        }
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
