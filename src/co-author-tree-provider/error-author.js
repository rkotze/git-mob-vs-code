const vscode = require("vscode");
const { None } = vscode.TreeItemCollapsibleState;

class ErrorAuthor extends vscode.TreeItem {
  constructor(name, contextValue = "error-author") {
    super(name || "Error: missing author!", None);
    this.email = "e@r.ror";
    this.selected = false;
    this.commandKey = "";
    this.contextValue = contextValue;
  }

  get tooltip() {
    return "Error: missing author!";
  }
}

exports.ErrorAuthor = ErrorAuthor;
