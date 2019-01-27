const path = require("path");
const fs = require("fs");
const vscode = require("vscode");

function isGitRepository() {
  const rootPath = vscode.workspace.rootPath;
  if (!rootPath) return false;

  try {
    const gitDir = path.join(rootPath, ".git");
    const gitDirStats = fs.statSync(gitDir);
    return gitDirStats.isDirectory();
  } catch (err) {
    return false;
  }
}

exports.isGitRepository = isGitRepository;
