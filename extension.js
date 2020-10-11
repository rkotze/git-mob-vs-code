const { mob } = require("./src/git/commands");
const { setupGitMob } = require("./src/setup-git-mob");
const { GitExt } = require("./src/vscode-git-extension/git-ext");
const { installPrompt } = require("./src/install-prompt");
const { waitForRepos } = require("./src/wait-for-repos");

function activate(context) {
  const gitExt = new GitExt();
  waitForRepos(gitExt, () => {
    if (mob.gitMobLatest() === 1) {
      installPrompt(() => {
        setupGitMob(context, gitExt);
      });
    } else {
      setupGitMob(context, gitExt);
    }
  });
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
