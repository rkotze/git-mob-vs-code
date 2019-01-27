const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const { CONSTANTS } = require("./constants");

function hasPrepareCommitMsgTemplate() {
  const rootPath = vscode.workspace.rootPath;
  if (!rootPath) return false;
  const hookPath = path.join(rootPath, ".git", CONSTANTS.GIT_MOB_TEMPLATE);
  return fs.existsSync(hookPath);
}

function setContextPrepareMessage() {
  vscode.commands.executeCommand(
    "setContext",
    "gitmob.prepareMessageHook",
    hasPrepareCommitMsgTemplate()
  );
}

exports.hasPrepareCommitMsgTemplate = hasPrepareCommitMsgTemplate;
exports.setContextPrepareMessage = setContextPrepareMessage;
