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
    this._notLoaded = true;
    this._selected = [];
    this.multiSelected = [];
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.mobAuthors = new MobAuthors();
    this.gitExt = new GitExt();
    this.config = vscode.workspace.getConfiguration("gitMob.authorList");
  }

  async getChildren(element = {}) {
    const allAuthors = await this.mobAuthors.listAll();
    if (element.fetchChildren) {
      return element.fetchChildren();
    }

    return [
      new ProjectFolder(this.gitExt.selectedFolderName),
      this.mobAuthors.author,
      new Selected(() => this.mobAuthors.listCurrent),
      new Unselected(() => {
        const setAllAuthor = new Set(allAuthors);
        for (let author of setAllAuthor) {
          if (author.selected) setAllAuthor.delete(author);
        }
        return Array.from(setAllAuthor);
      }),
      new MoreAuthors(this.config.get("expandMoreAuthors"), () =>
        this.mobAuthors.repoAuthorList()
      ),
    ];
  }

  async getTreeItem(element) {
    const lastCoAuthor = await this.mobAuthors.lastCoAuthor();
    if (element.email === lastCoAuthor.email && this._notLoaded) {
      this.loaded();
      this._notLoaded = false;
    }

    return element;
  }

  toggleCoAuthor(author, selected) {
    const selectedCoAuthors = this.multiSelected.filter(
      (author) => author instanceof CoAuthor
    );
    if (selectedCoAuthors.length > 1) {
      this.mobAuthors.setCurrent(selectedCoAuthors, selected);
    } else {
      this.mobAuthors.setCurrent([author], selected);
    }
    this.reloadData();
  }

  reloadData() {
    this.multiSelected = [];
    this._onDidChangeTreeData.fire();
  }
}

exports.CoAuthorProvider = CoAuthorProvider;
