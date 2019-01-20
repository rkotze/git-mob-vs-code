const path = require("path");
const vscode = require("vscode");

class TreeNode {
  constructor(name, contextValue = "", iconPath = "") {
    this.key = name;
    this.contextValue = contextValue;
    this.iconPath = iconPath;
  }

  getTreeItem({ context }) {
    return {
      label: this.key,
      collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
      contextValue: this.contextValue,
      iconPath: this.iconResolver(context)
    };
  }

  iconResolver({ asAbsolutePath }) {
    return (
      this.iconPath &&
      asAbsolutePath(path.join("resources/icons/", this.iconPath))
    );
  }
}

exports.TreeNode = TreeNode;
