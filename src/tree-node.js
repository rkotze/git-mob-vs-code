const path = require("path");
const vscode = require("vscode");

const { Expanded } = vscode.TreeItemCollapsibleState;
class TreeNode {
  constructor(
    name,
    contextValue = "",
    iconPath = "",
    collapsibleState = Expanded
  ) {
    this.key = name;
    this.contextValue = contextValue;
    this.iconPath = iconPath;
    this.collapsibleState = collapsibleState;
  }

  getTreeItem({ context }) {
    return {
      label: this.key,
      collapsibleState: this.collapsibleState,
      contextValue: this.contextValue,
      iconPath: this.iconResolver(context),
    };
  }

  iconResolver({ asAbsolutePath }) {
    if (this.iconPath instanceof vscode.ThemeIcon) {
      return this.iconPath;
    }

    return (
      this.iconPath &&
      asAbsolutePath(path.join("resources/icons/", this.iconPath))
    );
  }
}

exports.TreeNode = TreeNode;
