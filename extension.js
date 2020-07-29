const { mob } = require("./src/git/commands");
const { setupGitMob } = require("./src/setup-git-mob");
const { GitExt } = require("./src/vscode-git-extension/git-ext");


function activate(context) {
  const gitExt = new GitExt();
  setupGitMob(context, gitExt);
  if (mob.gitMobLatest() === 1) {
    mob.installGitMob();
  }
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
