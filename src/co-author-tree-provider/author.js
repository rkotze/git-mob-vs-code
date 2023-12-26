const vscode = require("vscode");
const { None } = vscode.TreeItemCollapsibleState;

class PrimaryAuthor extends vscode.TreeItem {
  constructor(name, email) {
    super(name, None);
    this.name = name;
    this.email = email;
    this.contextValue = "primary-author";
  }

  get iconPath() {
    return new vscode.ThemeIcon("account");
  }

  get description() {
    return this.email;
  }

  get tooltip() {
    return `Author: ${this.label}\n${this.email}`;
  }
}

exports.PrimaryAuthor = PrimaryAuthor;
