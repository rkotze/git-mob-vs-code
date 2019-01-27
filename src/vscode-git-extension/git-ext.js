const vscode = require("vscode");

class GitExt {
  constructor() {
    const ext = vscode.extensions.getExtension("vscode.git");
    this.gitApi = ext.isActive && ext.exports.getAPI(1);
  }

  get repositories() {
    return this.gitApi.repositories;
  }
}

exports.GitExt = GitExt;
