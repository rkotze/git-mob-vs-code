const path = require("path");
const vscode = require("vscode");
const { ErrorAuthor } = require("./error-author");
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

function createAuthor(stdoutFormat) {
  const regexList =
    /^([\S]+)\s(.+)\s([a-zA-Z0-9_\-\.\+]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5})/;
  let list = stdoutFormat.match(regexList);
  if (list === null) return new ErrorAuthor();
  const [, commandKey, name, email] = list;
  return new CoAuthor(name, email, false, commandKey);
}

exports.createAuthor = createAuthor;
exports.CoAuthor = CoAuthor;
