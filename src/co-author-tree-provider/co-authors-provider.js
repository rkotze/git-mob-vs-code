const vscode = require("vscode");
const { MobAuthors } = require("../mob-authors");
const {
  ProjectFolder,
  Selected,
  Unselected,
  MoreAuthors,
} = require("./group-item");
const { GitExt } = require("../vscode-git-extension/git-ext");
const { CoAuthor } = require("./co-authors");

class CoAuthorProvider {
  constructor(coAuthorGroups) {
    this.multiSelected = [];
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.mobAuthors = new MobAuthors();
    this.coAuthorGroups = coAuthorGroups;
    this.gitExt = new GitExt();
    this.config = vscode.workspace.getConfiguration("gitMob.authorList");
  }

  async getChildren(element = {}) {
    if (element.fetchChildren) {
      return element.fetchChildren();
    }

    return [
      new ProjectFolder(this.gitExt.selectedFolderName),
      this.coAuthorGroups.getMainAuthor(),
      new Selected(() => this.coAuthorGroups.getSelected()),
      new Unselected(() => this.coAuthorGroups.getUnselected()),
      new MoreAuthors(this.config.get("expandMoreAuthors"), () =>
        this.coAuthorGroups.getGitRepoAuthors()
      ),
    ];
  }

  async getTreeItem(element) {
    return element;
  }

  async toggleCoAuthor(author, selected) {
    const selectedCoAuthors = this.multiSelected.filter(
      (author) => author instanceof CoAuthor
    );
    const coAuthors = this.coAuthorGroups;
    if (selectedCoAuthors.length > 1) {
      selected
        ? coAuthors.select(selectedCoAuthors)
        : coAuthors.unselect(selectedCoAuthors);
    } else {
      selected ? coAuthors.select([author]) : coAuthors.unselect([author]);
    }
    this.reloadData();
  }

  reloadData() {
    this.multiSelected = [];
    this._onDidChangeTreeData.fire();
  }
}

exports.CoAuthorProvider = CoAuthorProvider;
