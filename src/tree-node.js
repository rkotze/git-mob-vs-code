const path = require("path");
const vscode = require("vscode");

class TreeNode {
  constructor(name, contextValue = "", iconPath = "", expanded = true) {
    this.key = name;
    this.contextValue = contextValue;
    this.iconPath = iconPath;
    this.expanded = expanded;
  }

  getTreeItem({ context }) {
    const { Expanded, Collapsed } = vscode.TreeItemCollapsibleState;
    return {
      label: this.key,
      collapsibleState: this.expanded ? Expanded : Collapsed,
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
