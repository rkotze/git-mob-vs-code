const vscode = require("vscode");

class TestView {
  constructor(context) {
    const view = vscode.window.createTreeView("gitMobCoAuthors", {
      treeDataProvider: aNodeWithIdTreeDataProvider()
    });
  }
}

exports.TestView = TestView;

const tree = {
  a: {
    aa: {
      aaa: {
        aaaa: {
          aaaaa: {
            aaaaaa: {}
          }
        }
      }
    },
    ab: {}
  },
  b: {
    ba: {},
    bb: {}
  }
};
let nodes = {};

function aNodeWithIdTreeDataProvider() {
  return {
    getChildren: element => {
      const a = getChildren(element ? element.key : undefined).map(key =>
        getNode(key)
      );

      return a;
    },
    getTreeItem: element => {
      const treeItem = getTreeItem(element.key);
      treeItem.id = element.key;
      return treeItem;
    },
    getParent: ({ key }) => {
      const parentKey = key.substring(0, key.length - 1);
      return parentKey ? new Key(parentKey) : void 0;
    }
  };
}

function getChildren(key) {
  if (!key) {
    return Object.keys(tree);
  }
  let treeElement = getTreeElement(key);
  if (treeElement) {
    return Object.keys(treeElement);
  }
  return [];
}

function getTreeItem(key) {
  const treeElement = getTreeElement(key);
  return {
    label: key,
    tooltip: `Tooltip for ${key}`,
    collapsibleState:
      treeElement && Object.keys(treeElement).length
        ? vscode.TreeItemCollapsibleState.Expanded
        : vscode.TreeItemCollapsibleState.None
  };
}

function getTreeElement(element) {
  let parent = tree;
  for (let i = 0; i < element.length; i++) {
    parent = parent[element.substring(0, i + 1)];
    if (!parent) {
      return null;
    }
  }
  return parent;
}

function getNode(key) {
  if (!nodes[key]) {
    nodes[key] = new Key(key);
  }
  return nodes[key];
}

class Key {
  constructor(key) {
    this.key = key;
  }
}
