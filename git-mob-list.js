const vscode = require("vscode");

class GitMob {
  constructor(context) {
    vscode.window.registerTreeDataProvider(
      "gitMobCoAuthors",
      aNodeWithIdTreeDataProvider()
    );
  }
}
exports.GitMob = GitMob;

function aNodeWithIdTreeDataProvider() {
  return {
    getChildren: element => {
      console.log("element: ", element);

      return [
        {
          key: "Richard"
        },
        {
          key: "Dennis"
        }
      ];
    },
    getTreeItem: element => {
      const treeItem = getTreeItem(element.key);
      treeItem.id = element.key;
      return treeItem;
    }
  };
}

function getTreeItem(key) {
  return {
    label: key,
    tooltip: `Tooltip for ${key}`
  };
}
