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

function createRepoAuthorList(stringOfAuthors) {
  const splitEndOfLine = stringOfAuthors.split("\n");
  return splitEndOfLine
    .map(createRepoAuthor)
    .filter((author) => author instanceof RepoAuthor);
}

function createRepoAuthor(authorString) {
  try {
    const regexList = /\s\d+\t(.+)\s<(.+)>/;
    const [, name, email] = authorString.match(regexList);
    return new RepoAuthor(name, email, genKey(name, email));
  } catch (err) {
    return new Error(err.message);
  }
}

function genKey(name, email) {
  const nameInitials = name
    .toLowerCase()
    .split(" ")
    .reduce(function (acc, cur) {
      return acc + cur[0];
    }, "");

  const domainFirstTwoLetters = email.split("@")[1].slice(0, 2);
  return nameInitials + domainFirstTwoLetters;
}

exports.RepoAuthor = RepoAuthor;
exports.createRepoAuthorList = createRepoAuthorList;
