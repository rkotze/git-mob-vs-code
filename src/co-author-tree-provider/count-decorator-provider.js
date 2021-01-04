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
    this.coAuthorProvider.onDidChangeTreeData(function () {
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
        tooltip: "Available to co-author",
      };
    }
    if (uri.path === selected) {
      return {
        badge: mobAuthors.listCurrent.length.toString(),
        tooltip: "Selected co-authors",
      };
    }
    if (uri.path === moreAuthors) {
      const repoAuthors = await mobAuthors.repoAuthorList();
      const authorTotal = repoAuthors.length;
      const tooltip = `Contributors to this repo (${authorTotal})`;

      if (authorTotal > 99) {
        return {
          badge: "99",
          tooltip,
        };
      }

      return {
        badge: authorTotal.toString(),
        tooltip,
      };
    }
  }

  dispose() {
    this.disposables.forEach((d) => d.dispose());
  }
}

exports.CountDecorationProvider = CountDecorationProvider;
