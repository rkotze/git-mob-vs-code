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

    let disposableAddCoAuthor = vscode.commands.registerCommand(
      "gitmob.addCoAuthor",
      function(author) {
        coAuthorProvider.toggleCoAuthor(author, true);
      }
    );

    context.subscriptions.push(disposableAddCoAuthor);

    let disposableRemoveCoAuthor = vscode.commands.registerCommand(
      "gitmob.removeCoAuthor",
      function(author) {
        coAuthorProvider.toggleCoAuthor(author, false);
      }
    );
    context.subscriptions.push(disposableRemoveCoAuthor);
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
    const allAuthors = this.mobAuthors.listAll;
    if (element.key === "Selected") {
      return this.mobAuthors.listCurrent;
    }

    if (element.key === "Unselected") {
      const setAllAuthor = new Set(allAuthors);
      for (let author of setAllAuthor) {
        if (author.selected) setAllAuthor.delete(author);
      }
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

  toggleCoAuthor(author, selected) {
    this.mobAuthors.listAll.forEach(coAuthor => {
      if (author && author.email == coAuthor.email)
        coAuthor.selected = selected;
    });

    this.mobAuthors.setCurrent(author, selected);
    this._onDidChangeTreeData.fire();
  }
}
