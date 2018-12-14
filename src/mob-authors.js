const { mob, config } = require("./commands");

let author = null;
let allAuthors = null;

class MobAuthors {
  get author() {
    if (author === null) {
      const name = config.get("user.name");
      const email = config.get("user.email");

      author = new Author("Author: " + name, email);
    }
    return author;
  }

  get listCurrent() {
    const currentMob = mob.current();

    return this.listAll.filter(author => currentMob.includes(author.email));
  }

  get listAll() {
    if (allAuthors === null) {
      const other = mob
        .listAll()
        .split("\n")
        .map(author => createAuthor(author));
      allAuthors = this.removeAuthor(other);
    }
    return allAuthors;
  }

  removeAuthor(authorList) {
    return authorList.filter(author => author.email !== this.author.email);
  }
}

exports.MobAuthors = MobAuthors;

class Author {
  constructor(name, email, selected = false, commandKey = "") {
    this.key = name;
    this.email = email;
    this.selected = selected;
    this.commandKey = commandKey;
  }
}

function createAuthor(stdoutFormat) {
  const regexList = /^([a-z]{1,3})\s(.+)\s([a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5})/;
  let list = stdoutFormat.match(regexList);
  if (list && list.length === 4) {
    const [, commandKey, name, email] = list;
    return new Author(name, email, false, commandKey);
  }

  const regexCurrent = /(.+)\s([a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5})/;
  list = stdoutFormat.match(regexCurrent);
  const [, name, email] = list;
  return new Author(name, email, true);
}
