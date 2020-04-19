const path = require("path");
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
      return this.selectedRepository.rootUri.fsPath;

    return "";
  }

  get selectedFolderName() {
    const segments = this.rootPath.split(path.sep);
    if (segments.length > 0) {
      return segments.pop();
    }
    return "";
  }

  get selectedRepository() {
    if (this.repositories.length === 1) return this.repositories[0];

    return this.repositories.find((repo) => repo.ui.selected);
  }

  updateSelectedInput(value) {
    const valueIsFunction = typeof value === "function";
    const repo = this.selectedRepository;
    if (valueIsFunction) {
      repo.inputBox.value = value(repo.inputBox.value);
    } else {
      repo.inputBox.value = value;
    }
  }

  onDidChangeUiState(stateChangeCallback) {
    const trackRepos = [];

    for (let repo of this.repositories) {
      if (!trackRepos.includes(repo.rootUri.path)) {
        trackRepos.push(repo.rootUri.path);
        repo.ui.onDidChange(stateChangeCallback);
      }
    }

    this.gitApi.onDidOpenRepository(function (repo) {
      if (!trackRepos.includes(repo.rootUri.path)) {
        trackRepos.push(repo.rootUri.path);
        repo.ui.onDidChange(stateChangeCallback);
      }
    });

    this.gitApi.onDidCloseRepository(function (repo) {
      const index = trackRepos.indexOf(repo.rootUri.path);
      if (index > -1) {
        trackRepos.splice(index, 1);
      }
    });
  }
}

exports.GitExt = GitExt;
