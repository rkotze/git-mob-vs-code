const { mob, config, getRepoAuthors } = require("./git/commands");
const { createRepoAuthorList } = require("./authors/repo-authors");
const { createAuthor } = require("./authors/co-authors");
const { Author } = require("./authors/author");
const { ErrorAuthor } = require("./authors/error-author");

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
        author = new Author("Author: " + name, email);
      } else {
        author = new ErrorAuthor("Missing git author");
      }
    }
    return author;
  }

  get listCurrent() {
    if (setMob !== null) {
      const tempMob = setMob;
      setMob = null;
      return tempMob;
    }

    const currentMob = mob.current();

    return this.listAll.reduce((acc, author) => {
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

  setCurrent(author, selected) {
    const commandKeys = [];

    this.listAll.forEach((coAuthor) => {
      if (author && author.email == coAuthor.email)
        coAuthor.selected = selected;
      if (coAuthor.selected) commandKeys.push(coAuthor.commandKey);
    });

    if (commandKeys.length > 0) {
      const currentMob = mob.setCurrent(commandKeys);
      setMob = this.listAll.filter((author) =>
        currentMob.includes(author.email)
      );
    } else {
      mob.solo();
      setMob = [];
    }
  }

  get listAll() {
    if (allAuthors === null) {
      allAuthors = mob
        .listAll()
        .split("\n")
        .filter((authorText) => !authorText.includes(this.author.email))
        .map((author) => createAuthor(author));
    }
    return allAuthors;
  }

  get lastCoAuthor() {
    return this.listAll[this.listAll.length - 1];
  }

  async repoAuthorList() {
    if (allRepoAuthors === null) {
      const authorStr = await getRepoAuthors();
      const authorList = createRepoAuthorList(authorStr);

      allRepoAuthors = authorList.filter((authorList) => {
        if (authorList.email === this.author.email) return false;

        return !this.listAll.some(
          (coAuthor) => coAuthor.email === authorList.email
        );
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
