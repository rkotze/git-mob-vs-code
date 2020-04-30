const path = require("path");
const vscode = require("vscode");

const { Expanded, None, Collapsed } = vscode.TreeItemCollapsibleState;

class Group extends vscode.TreeItem {
  constructor(label, context, iconFile, collapsibleState = Expanded) {
    super(label, collapsibleState);
    this.contextValue = context;
    this.iconFile = iconFile;
  }

  get iconPath() {
    if (this.iconFile instanceof vscode.ThemeIcon) {
      return this.iconFile;
    }

    return path.join(
      __filename,
      "..",
      "..",
      "..",
      "resources",
      "icons",
      this.iconFile
    );
  }
}

class ProjectFolder extends Group {
  constructor(label) {
    super(label, "", new vscode.ThemeIcon("folder-active"), None);
  }
}

class Selected extends Group {
  constructor(fetchChildren = () => {}) {
    super("Selected", "selected", "selected.svg");
    this.fetchChildren = fetchChildren;
  }

  get tooltip() {
    return "Co-authors you're committing with";
  }
}

class Unselected extends Group {
  constructor(fetchChildren = () => {}) {
    super("Unselected", "unselected", "unselected.svg");
    this.fetchChildren = fetchChildren;
  }

  get tooltip() {
    return "Co-author in your lists";
  }
}

class MoreAuthors extends Group {
  constructor(fetchChildren = () => {}) {
    super("More Authors", "more-authors", "more.svg", Collapsed);
    this.fetchChildren = fetchChildren;
  }

  get tooltip() {
    return "Authors who have contributed to this repo";
  }
}

exports.ProjectFolder = ProjectFolder;
exports.Selected = Selected;
exports.Unselected = Unselected;
exports.MoreAuthors = MoreAuthors;
