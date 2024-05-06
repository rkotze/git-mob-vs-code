const { setupGitMob } = require("./src/setup-git-mob");
const { GitExt } = require("./src/vscode-git-extension/git-ext");
const { waitForRepos } = require("./src/wait-for-repos");
const {
  installGitCoAuthorFile,
} = require("./src/install/install-git-coauthor-file");
const { logIssue } = require("./src/errors/log-issue");

let isReady = false;

async function activate(context) {
  try {
    await installGitCoAuthorFile();
  } catch (error) {
    logIssue(
      `Extension Activate: Oops something went wrong creating co-author file. Error: ${error.message}`
    );
  }
  const gitExt = new GitExt();
  waitForRepos(gitExt, () => {
    isReady = true;
    setupGitMob(context, gitExt);
  });
}

exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;

function ready() {
  return new Promise((resolve, reject) => {
    retry(1, resolve, reject);
  });
}

function retry(count, resolve, reject) {
  if (isReady) {
    resolve("git-mob ready");
  }
  if (count >= 10) {
    reject("git-mob failed");
  }
  setTimeout(function () {
    retry(count + 1, resolve, reject);
  }, 200);
}

exports.ready = ready;
