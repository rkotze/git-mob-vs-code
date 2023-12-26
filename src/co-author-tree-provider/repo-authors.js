const path = require("path");
const vscode = require("vscode");
const { None } = vscode.TreeItemCollapsibleState;

class RepoAuthor extends vscode.TreeItem {
  constructor(name, email, commandKey) {
    super(name, None);
    this.name = name;
    this.email = email;
    this.commandKey = commandKey;
  }

  get iconPath() {
    return path.join(__dirname, "..", "..", "resources", "icons", "user.svg");
  }

  get description() {
    return this.email;
  }

  get tooltip() {
    return `${this.label}\n${this.email}`;
  }

  get contextValue() {
    return "add-repo-author";
  }
}

exports.RepoAuthor = RepoAuthor;
