const { getRepoAuthors } = require("./git/commands");
const {
  createRepoAuthorList,
} = require("./co-author-tree-provider/repo-authors");
const { CoAuthor } = require("./co-author-tree-provider/co-authors");
const { Author } = require("./co-author-tree-provider/author");
const { ErrorAuthor } = require("./co-author-tree-provider/error-author");

const {
  getAllAuthors,
  applyCoAuthors,
  solo,
  primaryAuthor,
  fetchSelectedCoAuthors,
} = require("./git/git-mob-api");
let author = null;
let allAuthors = null;
let allRepoAuthors = null;
let setMob = null;

class MobAuthors {
  get author() {
    if (author === null) {
      let mainAuthor = primaryAuthor();

      if (mainAuthor) {
        author = new Author(mainAuthor.name, mainAuthor.email);
      } else {
        author = new ErrorAuthor("Missing git author");
      }
    }
    return author;
  }

  async listCurrent() {
    if (setMob !== null) {
      const tempMob = setMob;
      setMob = null;
      return tempMob;
    }

    const list = await this.listAll();
    const currentMob = fetchSelectedCoAuthors(list);

    for (const author of list) {
      if (currentMob.find((coAuthor) => coAuthor.email === author.email)) {
        author.selected = true;
      }

      author.selected = false;
    }

    return currentMob.map((author) => {
      author.selected = true;
      return author;
    });
  }

  async setCurrent(authors, selected) {
    const selectedAuthorKeys = [];

    const authorKeys = authors.map((author) => author.commandKey);
    const list = await this.listAll();
    for (const coAuthor of list) {
      if (authorKeys.includes(coAuthor.commandKey))
        coAuthor.selected = selected;
      if (coAuthor.selected) selectedAuthorKeys.push(coAuthor.commandKey);
    }

    if (selectedAuthorKeys.length > 0) {
      const currentMob = await applyCoAuthors(selectedAuthorKeys);
      setMob = currentMob.map(
        (author) => new CoAuthor(author.name, author.email, true, author.key)
      );
    } else {
      await solo();
      setMob = [];
    }
  }

  async listAll() {
    if (allAuthors === null) {
      const authorList = await getAllAuthors();
      allAuthors = authorList
        .filter((author) => author.email !== this.author.email)
        .map(
          (author) => new CoAuthor(author.name, author.email, false, author.key)
        );
    }
    return allAuthors;
  }

  async lastCoAuthor() {
    const list = await this.listAll();
    return list[list.length - 1];
  }

  async repoAuthorList() {
    if (allRepoAuthors === null) {
      const authorStr = await getRepoAuthors();
      const contributorAuthorList = createRepoAuthorList(authorStr);
      const list = await this.listAll();

      allRepoAuthors = contributorAuthorList.filter((repoAuthor) => {
        if (repoAuthor.email === this.author.email) return false;

        return !list.some((coAuthor) => coAuthor.email === repoAuthor.email);
      });
      return allRepoAuthors;
    }
    return allRepoAuthors;
  }

  resetRepoAuthorList() {
    allRepoAuthors = null;
  }

  reset() {
    allAuthors = null;
    author = null;
    setMob = null;
    this.resetRepoAuthorList();
  }
}

exports.MobAuthors = MobAuthors;
