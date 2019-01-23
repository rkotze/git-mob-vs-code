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

exports.hasPrepareCommitMsgTemplate = hasPrepareCommitMsgTemplate;
