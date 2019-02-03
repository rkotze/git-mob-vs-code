const os = require("os");
const { TreeNode } = require("../tree-node");

class RepoAuthor extends TreeNode {
  constructor(key, name, email, commandKey) {
    super(key);
    this.name = name;
    this.email = email;
    this.commandKey = commandKey;
  }

  getTreeItem() {
    return {
      label: `${this.key} ${this.email}`,
      collapsibleState: vscode.TreeItemCollapsibleState.collapsibleState
    };
  }
}

function createRepoAuthorList(stringOfAuthors) {
  const splitEndOfLine = stringOfAuthors.split(os.EOL);
  return splitEndOfLine.map(createRepoAuthor);
}

function createRepoAuthor(authorString, index) {
  const regexList = /^\d+\s(.+)\s<([a-zA-Z0-9_\-\.\+]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5})>/;
  const [, name, email] = authorString.match(regexList);
  return new RepoAuthor(index, name, email, genKey(name, email));
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
