const { setupGitMob } = require("./src/setup-git-mob");
const { GitExt } = require("./src/vscode-git-extension/git-ext");
const { waitForRepos } = require("./src/wait-for-repos");
const {
  installGitCoAuthorFile,
} = require("./src/install/install-git-coauthor-file");

let isReady = false;

async function activate(context) {
  await installGitCoAuthorFile();
  const gitExt = new GitExt();
  waitForRepos(gitExt, () => {
    setupGitMob(context, gitExt);
    isReady = true;
  });
}

exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;

exports.ready = function ready() {
  return new Promise(function (resolved) {
    if (isReady) {
      return resolved("git-mob ready");
    }

    setTimeout(function () {
      ready();
    }, 1050);
  });
};
