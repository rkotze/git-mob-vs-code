const { setupGitMob } = require("./src/git-mob-list");
const { openGitCoAuthor } = require("./src/open-git-coauthors");

function activate(context) {
  setupGitMob(context);
  openGitCoAuthor(context);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
