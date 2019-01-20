const { setupGitMob } = require("./src/setup-git-mob");

function activate(context) {
  setupGitMob(context);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
