const { TreeNode } = require("../tree-node");

class Author extends TreeNode {
  constructor(name, email) {
    super(name);
    this.email = email;
  }

  getTreeItem({ context }) {
    return {
      label: this.key,
      tooltip: `Email: ${this.email}`,
      contextValue: "",
      iconPath: context.asAbsolutePath("resources/icons/user.svg")
    };
  }
}

exports.Author = Author;
