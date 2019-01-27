const vscode = require("vscode");
const { hasPrepareCommitMsgTemplate } = require("../prepare-commit-msg-file");

function gitMobHookStatus({ context }) {
  const myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    10
  );
  context.subscriptions.push(myStatusBarItem);
  return function() {
    myStatusBarItem.text = "$(file-code) Git Mob";
    myStatusBarItem.tooltip = "Using .gitmessage template";
    if (hasPrepareCommitMsgTemplate()) {
      myStatusBarItem.text = "$(zap) Git Mob";
      myStatusBarItem.tooltip = "Using prepare-commit-msg hook";
    }
    myStatusBarItem.show();
    return myStatusBarItem;
  };
}

exports.gitMobHookStatus = gitMobHookStatus;
