const path = require("path");
const vscode = require("vscode");
const { None } = vscode.TreeItemCollapsibleState;

class Author extends vscode.TreeItem {
  constructor(name, email) {
    super(name, None);
    this.email = email;
  }

  get iconPath() {
    return path.join(__dirname, "..", "..", "resources", "icons", "user.svg");
  }

  get tooltip() {
    return `Email: ${this.email}`;
  }
}

exports.Author = Author;
