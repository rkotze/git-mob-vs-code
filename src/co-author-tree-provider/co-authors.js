const path = require("path");
const vscode = require("vscode");
const { None } = vscode.TreeItemCollapsibleState;

class CoAuthor extends vscode.TreeItem {
  constructor(name, email, selected = false, commandKey = "") {
    super(name, None);
    this.name = name;
    this.email = email;
    this.selected = selected;
    this.commandKey = commandKey;
  }

  get contextValue() {
    return this.selected ? "remove-author" : "add-author";
  }

  get tooltip() {
    return `${this.label}\n${this.email}`;
  }

  get iconPath() {
    return path.join(__dirname, "..", "..", "resources", "icons", "user.svg");
  }

  get description() {
    return this.email;
  }

  format() {
    return `Co-authored-by: ${this.toString()}`;
  }

  toString() {
    return `${this.label} <${this.email}>`;
  }
}

exports.CoAuthor = CoAuthor;
