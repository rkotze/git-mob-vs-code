const vscode = require("vscode");

class TreeNode {
  constructor(name, contextValue = "") {
    this.key = name;
    this.contextValue = contextValue;
  }

  getTreeItem() {
    return {
      label: this.key,
      collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
      contextValue: this.contextValue
    };
  }
}

exports.TreeNode = TreeNode;
