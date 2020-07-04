const vscode = require("vscode");

function vsCodeGit() {
  const ext = vscode.extensions.getExtension("vscode.git");
  return ext.isActive && ext.exports.getAPI(1);
}

exports.vsCodeGit = vsCodeGit;
