const path = require("path");
const vscode = require("vscode");
const { None } = vscode.TreeItemCollapsibleState;

class Author extends vscode.TreeItem {
  constructor(name, email) {
    super(name, None);
    this.name = name;
    this.email = email;
  }

  get iconPath() {
    return path.join(__dirname, "..", "..", "resources", "icons", "user.svg");
  }

  get tooltip() {
    return `${this.label}\n${this.email}`;
  }
}

exports.Author = Author;
