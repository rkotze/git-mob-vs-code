const vscode = require("vscode");

const LOG_ISSUE = "Log issue";

async function logIssue(errorMessage) {
  const errorAction = await vscode.window.showErrorMessage(
    errorMessage,
    LOG_ISSUE,
    "Dismiss"
  );
  if (errorAction === LOG_ISSUE)
    vscode.env.openExternal(
      vscode.Uri.parse("https://github.com/rkotze/git-mob-vs-code/issues")
    );
}

exports.logIssue = logIssue;
