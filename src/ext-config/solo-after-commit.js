const vscode = require("vscode");
const { watchForCommit } = require("../git/watch-for-commit");
const { getConfigSolo } = require("./config");

exports.soloAfterCommit = function soloAfterCommit(coAuthorProvider) {
  vscode.workspace.onDidChangeConfiguration((evt) => {
    if (evt.affectsConfiguration("gitMob.postCommit")) {
      soloSwitch(coAuthorProvider, getConfigSolo(coAuthorProvider));
    }
  });

  soloSwitch(coAuthorProvider, getConfigSolo(coAuthorProvider));
};

let watch = null;
function soloSwitch(coAuthorProvider, afterCommitOn) {
  if (afterCommitOn) {
    watch = watchForCommit(async function () {
      await coAuthorProvider.coAuthorGroups.solo();
      await vscode.commands.executeCommand("gitmob.reload");
    });
  } else {
    if (watch) {
      watch.close();
      watch = null;
    }
  }
}
