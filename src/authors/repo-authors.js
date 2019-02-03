const os = require("os");
const { TreeNode } = require("../tree-node");

class RepoAuthor extends TreeNode {
  constructor(name, email) {
    super(name);
    this.email = email;
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

function createRepoAuthor(authorString) {
  const regexList = /^\d+\s(.+)\s<([a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5})>/;
  const [, name, email] = authorString.match(regexList);
  return new RepoAuthor(name, email);
}

exports.RepoAuthor = RepoAuthor;
exports.createRepoAuthorList = createRepoAuthorList;
