const os = require("os");
const vscode = require("vscode");
const { mob, config } = require("./commands");

class GitMob {
  constructor(context) {
    const coAuthorProvider = new CoAuthorProvider();
    vscode.window.registerTreeDataProvider("gitMobCoAuthors", coAuthorProvider);

    let disposable = vscode.commands.registerCommand(
      "gitmob.addCoAuthor",
      function(author) {
        coAuthorProvider.addCoAuthor(author);
        vscode.window.showInformationMessage(`Added author ${author.key}`);
      }
    );

    context.subscriptions.push(disposable);
  }
}
exports.GitMob = GitMob;

function createAuthor(stdoutFormat) {
  const regexList = /^([a-z]{1,4})\s(.+)\s<(.+)/;
  let list = stdoutFormat.match(regexList);
  if (list && list.length === 4) {
    const [, commandKey, name, email] = list;
    return author(name, email, false, commandKey);
  }

  const regexCurrent = /(.+)\s<(.+)/;
  list = stdoutFormat.match(regexCurrent);
  const [, name, email] = list;
  return author(name, email, true);
}

function author(name, email, selected = false, commandKey = "") {
  return {
    key: name,
    email,
    selected,
    commandKey
  };
}

function Groups() {
  return {
    key: "Selected"
  };
}

class CoAuthorProvider {
  constructor() {
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  getChildren(element = {}) {
    if (element.key === "Selected") {
      const a = vscode.workspace.rootPath;
      const currentMob = mob.current(a).split(">");
      return currentMob.map(author => createAuthor(author));
    }

    if (element.key === "Unselected") {
      return [
        {
          key: "dennis",
          email: "fake@dennis.com",
          selected: false,
          commandKey: ""
        }
      ];
    }

    return [
      {
        key: "Selected",
        expand: true
      },
      {
        key: "Unselected",
        expand: true
      }
    ];
  }

  getTreeItem(element) {
    return {
      id: element.key,
      label: element.key,
      tooltip: `Tooltip for ${element.key}`,
      contextValue: element.selected ? "remove-author" : "add-author",
      collapsibleState: element.expand
        ? vscode.TreeItemCollapsibleState.Expanded
        : vscode.TreeItemCollapsibleState.None
    };
  }

  addCoAuthor(author) {
    coAuthors = coAuthors.map(coAuthor => {
      if (author && author.key == coAuthor.key) coAuthor.selected = true;
      return coAuthor;
    });
    this._onDidChangeTreeData.fire();
  }
}
