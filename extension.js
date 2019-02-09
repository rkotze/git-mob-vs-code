const { mob } = require("./src/git/commands");
const { setupGitMob } = require("./src/setup-git-mob");

function activate(context) {
  setupGitMob(context);
  if (mob.gitMobLatest() === 1) {
    mob.installGitMob();
  }
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
