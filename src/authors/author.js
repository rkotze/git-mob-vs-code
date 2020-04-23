const path = require("path");
const { TreeNode } = require("../tree-node");

class Author extends TreeNode {
  constructor(name, email) {
    super(name);
    this.email = email;
  }

  getTreeItem() {
    return {
      label: this.key,
      tooltip: `Email: ${this.email}`,
      contextValue: "",
      iconPath: path.join(__dirname, "..", "..", "resources", "icons", "user.svg")
    };
  }
}

exports.Author = Author;
