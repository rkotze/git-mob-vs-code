const { setupGitMob } = require("./src/setup-git-mob");
const { GitExt } = require("./src/vscode-git-extension/git-ext");
const { waitForRepos } = require("./src/wait-for-repos");
const {
  installGitCoAuthorFile,
} = require("./src/install/install-git-coauthor-file");
const {
  getAllAuthors,
  getSelectedCoAuthors,
} = require("./src/git/git-mob-api");

async function activate(context) {
  await installGitCoAuthorFile();
  const gitExt = new GitExt();
  waitForRepos(gitExt, () => {
    setupGitMob(context, gitExt);
  });
}

exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;

exports.selectedCoAuthors = async function () {
  const allAuthors = await getAllAuthors();
  return getSelectedCoAuthors(allAuthors);
};
