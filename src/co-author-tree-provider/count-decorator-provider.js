const vscode = require("vscode");

class CountDecorationProvider {
  constructor(coAuthorProvider) {
    this._onDidChangeDecorations = new vscode.EventEmitter();
    this.onDidChangeFileDecorations = this._onDidChangeDecorations.event;
    this.coAuthorProvider = coAuthorProvider;
    this.handleChange();
    this.disposables = [];
    this.disposables.push(vscode.window.registerFileDecorationProvider(this));
  }

  handleChange() {
    const changeDecoration = this._onDidChangeDecorations;
    this.coAuthorProvider.onCoAuthorChange(function () {
      changeDecoration.fire();
    });
  }

  async provideFileDecoration(uri) {
    const unselected = "/unselected";
    const selected = "/selected";
    const moreAuthors = "/more-authors";
    const mobAuthors = this.coAuthorProvider.mobAuthors;
    if (uri.path === unselected) {
      return {
        badge: mobAuthors.listAll
          .filter((author) => !author.selected)
          .length.toString(),
        tooltip: "Available to co-author with",
        propagate: false,
      };
    }
    if (uri.path === selected) {
      return {
        badge: mobAuthors.listCurrent.length.toString(),
        propagate: false,
        tooltip: "Co-authoring with",
      };
    }
    if (uri.path === moreAuthors) {
      const repoAuthors = await mobAuthors.repoAuthorList();
      return {
        badge: repoAuthors.length.toString(),
        propagate: false,
        tooltip: "Contributors to this repo",
      };
    }
  }

  dispose() {
    this.disposables.forEach((d) => d.dispose());
  }
}

exports.CountDecorationProvider = CountDecorationProvider;
