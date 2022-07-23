const vscode = require("vscode");
const { openSettingsExecute } = require("../commands/open-settings");

const LOG_ISSUE = "Log issue";
const READ_MORE = "Read more";
const DISMISS = "Dismiss";
const SETTINGS = "Open settings";

async function logIssue(errorMessage) {
  const errorAction = await vscode.window.showErrorMessage(
    errorMessage,
    LOG_ISSUE,
    DISMISS
  );
  if (errorAction === LOG_ISSUE)
    vscode.env.openExternal(
      vscode.Uri.parse("https://github.com/rkotze/git-mob-vs-code/issues")
    );
}

async function localWarning() {
  const warningAction = await vscode.window.showWarningMessage(
    `Git Mob now uses Git global config. You are using local commit.template`,
    READ_MORE,
    SETTINGS,
    DISMISS
  );

  if (warningAction === READ_MORE) {
    vscode.env.openExternal(
      vscode.Uri.parse(
        "https://github.com/rkotze/git-mob-vs-code/discussions/120"
      )
    );
  }

  if (warningAction === SETTINGS) {
    openSettingsExecute();
  }
}

module.exports = {
  logIssue,
  localWarning,
};
