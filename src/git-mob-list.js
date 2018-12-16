const vscode = require("vscode");
const { MobAuthors } = require("./mob-authors");
const { TreeNode } = require("./tree-node");

class GitMob {
  constructor(context) {
    const coAuthorProvider = new CoAuthorProvider();
    const mobList = vscode.window.createTreeView("gitMobCoAuthors", {
      treeDataProvider: coAuthorProvider
    });

    coAuthorProvider.loaded = function() {
      mobList.onDidChangeVisibility(function({ visible }) {
        if (visible) {
          coAuthorProvider._onDidChangeTreeData.fire();
        }
      });
    };

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
    this._notLoaded = true;
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
      new TreeNode("Selected"),
      new TreeNode("Unselected")
    ];
  }

  getTreeItem(element) {
    if (
      element.email === this.mobAuthors.lastCoAuthor.email &&
      this._notLoaded
    ) {
      this.loaded();
      this._notLoaded = false;
    }
    return element.getTreeItem();
  }

  addCoAuthor(author) {
    coAuthors = coAuthors.map(coAuthor => {
      if (author && author.key == coAuthor.key) coAuthor.selected = true;
      return coAuthor;
    });
    this._onDidChangeTreeData.fire();
  }
}
