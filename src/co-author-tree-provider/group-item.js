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
      __dirname,
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

  get tooltip() {
    return "Project folder: " + this.label;
  }
}

class Selected extends Group {
  constructor(fetchChildren = () => {}) {
    super("Co-authoring", "selected", "selected.svg");
    this.fetchChildren = fetchChildren;
  }

  get tooltip() {
    return "Selected co-authors";
  }
}

class Unselected extends Group {
  constructor(fetchChildren = () => {}) {
    super("Unselected", "unselected", "unselected.svg");
    this.fetchChildren = fetchChildren;
  }

  get tooltip() {
    return "Available co-authors";
  }
}

class MoreAuthors extends Group {
  constructor(expand = true, fetchChildren = () => {}) {
    super(
      "More Authors",
      "more-authors",
      "more.svg",
      expand ? Expanded : Collapsed
    );

    this.fetchChildren = fetchChildren;
  }

  get tooltip() {
    return "Contributors to this repo";
  }
}

exports.ProjectFolder = ProjectFolder;
exports.Selected = Selected;
exports.Unselected = Unselected;
exports.MoreAuthors = MoreAuthors;
