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
  constructor() {
    this._selected = [];
    this.multiSelected = [];
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.mobAuthors = new MobAuthors();
    this.gitExt = new GitExt();
    this.config = vscode.workspace.getConfiguration("gitMob.authorList");
  }

  async getChildren(element = {}) {
    if (element.fetchChildren) {
      return element.fetchChildren();
    }

    return [
      new ProjectFolder(this.gitExt.selectedFolderName),
      this.mobAuthors.author,
      new Selected(() => this.mobAuthors.listCurrent()),
      new Unselected(async () => {
        const allAuthors = await this.mobAuthors.listAll();
        return allAuthors.filter((author) => !author.selected);
      }),
      new MoreAuthors(this.config.get("expandMoreAuthors"), () =>
        this.mobAuthors.repoAuthorList()
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
    if (selectedCoAuthors.length > 1) {
      await this.mobAuthors.setCurrent(selectedCoAuthors, selected);
    } else {
      await this.mobAuthors.setCurrent([author], selected);
    }
    this.reloadData();
  }

  reloadData() {
    this.multiSelected = [];
    this._onDidChangeTreeData.fire();
  }
}

exports.CoAuthorProvider = CoAuthorProvider;
