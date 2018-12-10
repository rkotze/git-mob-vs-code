const vscode = require("vscode");

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

let coAuthors = [
  {
    key: "Richard",
    selected: false
  },
  {
    key: "Dennis",
    selected: false
  }
];

class CoAuthorProvider {
  constructor() {
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  getChildren() {
    return coAuthors;
  }

  getTreeItem(element) {
    return {
      label: element.key,
      tooltip: `Tooltip for ${element.key}`,
      contextValue: element.selected ? "remove-author" : "add-author"
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
