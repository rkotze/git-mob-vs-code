const { setupGitMob } = require("./src/git-mob-list");
// const vscode = require("vscode");
// const { TestView } = require("./src/test-view");

function activate(context) {
  setupGitMob(context);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
