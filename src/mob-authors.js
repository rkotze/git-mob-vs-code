const { mob, config, getRepoAuthors } = require("./git/commands");
const {
  createRepoAuthorList,
} = require("./co-author-tree-provider/repo-authors");
const { createAuthor } = require("./co-author-tree-provider/co-authors");
const { Author } = require("./co-author-tree-provider/author");
const { ErrorAuthor } = require("./co-author-tree-provider/error-author");
const { gitAuthors } = require("./git/git-mob-api/git-authors");

let author = null;
let allAuthors = null;
let allRepoAuthors = null;
let setMob = null;

class MobAuthors {
  get author() {
    if (author === null) {
      const name = config.get("user.name");
      const email = config.get("user.email");

      if (name && email) {
        author = new Author(name, email);
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

    const currentMob = mob.current();
    const list = await this.listAll();

    return list.reduce((acc, author) => {
      if (
        currentMob.includes(author.email) &&
        author.email !== this.author.email
      ) {
        author.selected = true;
        return [...acc, author];
      }

      author.selected = false;

      return acc;
    }, []);
  }

  async setCurrent(authors, selected) {
    const commandKeys = [];

    const authorEmails = authors.map((author) => author.email);
    const list = await this.listAll();
    for (const coAuthor of list) {
      if (authorEmails.includes(coAuthor.email)) coAuthor.selected = selected;
      if (coAuthor.selected) commandKeys.push(coAuthor.commandKey);
    }

    if (commandKeys.length > 0) {
      const currentMob = mob.setCurrent(commandKeys);
      setMob = list.filter((author) => currentMob.includes(author.email));
    } else {
      mob.solo();
      setMob = [];
    }
  }

  async listAll() {
    if (allAuthors === null) {
      const gitMobAuthors = gitAuthors();
      const authorList = gitMobAuthors.toList(await gitMobAuthors.read());
      allAuthors = authorList
        .filter((authorText) => !authorText.includes(this.author.email))
        .map((author) => createAuthor(author));
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
      const authorList = createRepoAuthorList(authorStr);
      const list = await this.listAll();

      allRepoAuthors = authorList.filter((authorList) => {
        if (authorList.email === this.author.email) return false;

        return !list.some((coAuthor) => coAuthor.email === authorList.email);
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
