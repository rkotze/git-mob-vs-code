const vscode = require("vscode");
const { Author } = require("./author");
const { ErrorAuthor } = require("./error-author");

class CoAuthor extends Author {
  constructor(name, email, selected = false, commandKey = "") {
    super(name, email);
    this.selected = selected;
    this.commandKey = commandKey;
  }

  getTreeItem({ context }) {
    return {
      label: this.key,
      tooltip: `Email: ${this.email}`,
      contextValue: this.selected ? "remove-author" : "add-author",
      collapsibleState: vscode.TreeItemCollapsibleState.None,
      iconPath: context.asAbsolutePath("resources/icons/user.svg"),
    };
  }

  format() {
    return `Co-authored-by: ${this.key} <${this.email}>`;
  }
}

function createAuthor(stdoutFormat) {
  const regexList = /^([\S]+)\s(.+)\s([a-zA-Z0-9_\-\.\+]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5})/;
  let list = stdoutFormat.match(regexList);
  if (list === null) return new ErrorAuthor();
  const [, commandKey, name, email] = list;
  return new CoAuthor(name, email, false, commandKey);
}

exports.createAuthor = createAuthor;
exports.CoAuthor = CoAuthor;
