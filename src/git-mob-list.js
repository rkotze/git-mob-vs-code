const vscode = require("vscode");
const { MobAuthors } = require("./mob-authors");

class GitMob {
  constructor(context) {
    const coAuthorProvider = new CoAuthorProvider();
    vscode.window.registerTreeDataProvider("gitMobCoAuthors", coAuthorProvider);

    let disposable = vscode.commands.registerCommand(
      "gitmob.addCoAuthor",
      function(author) {
        coAuthorProvider.addCoAuthor(author);
        vscode.window.showInformationMessage(`Added author ${author.key}`);
      }
    );

    context.subscriptions.push(disposable);
  }
}
exports.GitMob = GitMob;

class CoAuthorProvider {
  constructor() {
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.mobAuthors = new MobAuthors();
  }

  getChildren(element = {}) {
    const current = this.mobAuthors.listCurrent;
    const allAuthors = this.mobAuthors.listAll;
    if (element.key === "Selected") {
      return current;
    }

    if (element.key === "Unselected") {
      const setAllAuthor = new Set(allAuthors);
      current.forEach(function(author) {
        setAllAuthor.delete(author);
      });
      return Array.from(setAllAuthor);
    }

    return [
      this.mobAuthors.author,
      {
        key: "Selected",
        expand: true
      },
      {
        key: "Unselected",
        expand: true
      }
    ];
  }

  getTreeItem(element) {
    return {
      label: element.key,
      tooltip: `Tooltip for ${element.key}`,
      contextValue: element.selected ? "remove-author" : "add-author",
      collapsibleState: element.expand
        ? vscode.TreeItemCollapsibleState.Expanded
        : vscode.TreeItemCollapsibleState.None
    };
  }

  addCoAuthor(author) {
    coAuthors = coAuthors.map(coAuthor => {
      if (author && author.key == coAuthor.key) coAuthor.selected = true;
      return coAuthor;
    });
    this._onDidChangeTreeData.fire();
  }
}
