const { mob } = require("./src/git/commands");
const { setupGitMob } = require("./src/setup-git-mob");
const { GitExt } = require("./src/vscode-git-extension/git-ext");
const { installPrompt } = require("./src/install-prompt");

function activate(context) {
  if (mob.gitMobLatest() === 1) {
    installPrompt(() => {
      setupGitMob(context, new GitExt());
    });
  } else {
    setupGitMob(context, new GitExt());
  }
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
