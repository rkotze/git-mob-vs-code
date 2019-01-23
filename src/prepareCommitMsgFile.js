const fs = require("fs");
const path = require("path");
const vscode = require("vscode");

function hasPrepareCommitMsgTemplate() {
  const hookPath = path.join(
    vscode.workspace.rootPath,
    ".git",
    ".git-mob-template"
  );
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
