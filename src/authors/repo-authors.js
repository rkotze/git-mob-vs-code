const vscode = require("vscode");
const { Author } = require("./author");

class RepoAuthor extends Author {
  constructor(key, name, email, commandKey) {
    super(key, email);
    this.name = name;
    this.commandKey = commandKey;
  }

  getTreeItem({ context }) {
    return {
      label: `${this.name} <${this.email}>`,
      tooltip: `${this.name} <${this.email}>`,
      contextValue: "add-repo-author",
      collapsibleState: vscode.TreeItemCollapsibleState.None,
      iconPath: context.asAbsolutePath("resources/icons/user.svg")
    };
  }
}

function createRepoAuthorList(stringOfAuthors) {
  const splitEndOfLine = stringOfAuthors.split("\n");
  return splitEndOfLine
    .map(createRepoAuthor)
    .filter(author => author instanceof RepoAuthor);
}

function createRepoAuthor(authorString, index) {
  try {
    const regexList = /\s\d+\t(.+)\s<([a-zA-Z0-9_\-\.\+]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5})>/;
    const [, name, email] = authorString.match(regexList);
    return new RepoAuthor(index, name, email, genKey(name, email));
  } catch (err) {
    return new Error(err.message);
  }
}

function genKey(name, email) {
  const nameInitials = name
    .toLowerCase()
    .split(" ")
    .reduce(function(acc, cur) {
      return acc + cur[0];
    }, "");

  const domainFirstTwoLetters = email.split("@")[1].slice(0, 2);
  return nameInitials + domainFirstTwoLetters;
}

exports.RepoAuthor = RepoAuthor;
exports.createRepoAuthorList = createRepoAuthorList;
