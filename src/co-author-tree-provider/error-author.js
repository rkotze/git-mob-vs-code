const vscode = require("vscode");
const { None } = vscode.TreeItemCollapsibleState;

class ErrorAuthor extends vscode.TreeItem {
  constructor() {
    super("Error", None);
    this.email = "e@r.ror";
    this.selected = false;
    this.commandKey = "";
  }

  get tooltip() {
    return "Error";
  }
}

exports.ErrorAuthor = ErrorAuthor;
