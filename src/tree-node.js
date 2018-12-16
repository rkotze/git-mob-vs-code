const vscode = require("vscode");

class TreeNode {
  constructor(name) {
    this.key = name;
  }

  getTreeItem(expand) {
    return {
      label: this.key,
      collapsibleState: vscode.TreeItemCollapsibleState.Expanded
    };
  }
}

exports.TreeNode = TreeNode;
