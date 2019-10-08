const vscode = require("vscode");

class GitExt {
  constructor() {
    const ext = vscode.extensions.getExtension("vscode.git");
    this.gitApi = ext.isActive && ext.exports.getAPI(1);
  }

  get hasRepositories() {
    return this.repositories.length > 0;
  }

  get repositories() {
    return this.gitApi ? this.gitApi.repositories : [];
  }

  get rootPath() {
    if (this.repositories.length > 0)
      return this.repositories[0].rootUri.fsPath;

    return "";
  }
}

exports.GitExt = GitExt;
