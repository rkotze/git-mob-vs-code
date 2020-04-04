const vscode = require("vscode");
const { Author } = require("./author");

class ErrorAuthor extends Author {
  constructor(
    name = "Error",
    email = "e@r.ror",
    selected = false,
    commandKey = ""
  ) {
    super(name, email);
    this.selected = selected;
    this.commandKey = commandKey;
  }
  getTreeItem() {
    return {
      label: this.key,
      tooltip: `Error`,
      collapsibleState: vscode.TreeItemCollapsibleState.None,
    };
  }
  format() {
    return "Error";
  }
}

exports.ErrorAuthor = ErrorAuthor;
