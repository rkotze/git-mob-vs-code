const { RepoAuthor } = require("./co-author-tree-provider/repo-authors");
const { CoAuthor } = require("./co-author-tree-provider/co-authors");
const { PrimaryAuthor } = require("./co-author-tree-provider/author");
const { ErrorAuthor } = require("./co-author-tree-provider/error-author");
const { getSortDirection } = require("./ext-config/config");
const {
  getPrimaryAuthor,
  getAllAuthors,
  solo,
  setCoAuthors,
  getSelectedCoAuthors,
  updateGitTemplate,
  repoAuthorList,
} = require("git-mob-core");

exports.buildCoAuthorGroups = async function buildCoAuthorGroups() {
  let mainAuthor = null;
  let unselected = null;
  let selected = null;

  async function resolveAuthorLists() {
    mainAuthor = await getPrimaryAuthor();
    const allAuthors = await getAllAuthors();
    unselected = authorListToMap(
      allAuthors.filter((author) => mainAuthor.email != author.email),
      (author) => new CoAuthor(author.name, author.email, false, author.key)
    );
    selected = authorListToMap(
      await getSelectedCoAuthors(allAuthors),
      (author) => new CoAuthor(author.name, author.email, true, author.key)
    );

    selected.forEach((_, key) => {
      unselected.delete(key);
    });

    await updateGitTemplate(selected);
  }

  await resolveAuthorLists();

  return {
    getMainAuthor() {
      if (mainAuthor) {
        return new PrimaryAuthor(mainAuthor.name, mainAuthor.email);
      }
      return new ErrorAuthor("Missing Git author");
    },
    getUnselected() {
      return sortAuthors(Array.from(unselected.values()));
    },
    getSelected() {
      return sortAuthors(Array.from(selected.values()));
    },
    async getGitRepoAuthors() {
      const authors = await repoAuthorList();
      const contributorAuthorList = authors.map(
        ({ name, email, key }) => new RepoAuthor(name, email, key)
      );

      return sortAuthors(
        contributorAuthorList.filter((repoAuthor) => {
          if (repoAuthor.email === mainAuthor.email) return false;

          return ![...selected.values(), ...unselected.values()].some(
            (coAuthor) => coAuthor.email === repoAuthor.email
          );
        })
      );
    },
    select(coAuthors) {
      for (const coAuthorIn of coAuthors) {
        const key = coAuthorIn.commandKey;
        const coAuthor = unselected.get(key);
        coAuthor.selected = true;
        selected.set(key, coAuthor);
        unselected.delete(key);
      }

      setCoAuthors(Array.from(selected.keys()));
    },
    unselect(coAuthors) {
      for (const coAuthorIn of coAuthors) {
        const key = coAuthorIn.commandKey;
        const coAuthor = selected.get(key);
        coAuthor.selected = false;
        unselected.set(key, coAuthor);
        selected.delete(key);
      }

      setCoAuthors(Array.from(selected.keys()));
    },
    addNew(coAuthors) {
      for (const coAuthor of coAuthors) {
        coAuthor.selected = false;
        unselected.set(coAuthor.commandKey, coAuthor);
      }
    },
    async solo() {
      selected.forEach((value, key) => {
        unselected.set(key, value);
        selected.delete(key);
      });
      await solo();
    },
    async reloadData() {
      return resolveAuthorLists();
    },
  };
};

function authorListToMap(authors, cb) {
  const map = new Map();
  for (const author of authors) {
    const authorType = cb(author);
    map.set(authorType.commandKey, authorType);
  }

  return map;
}

function sortAuthors(authors) {
  let sorted = authors.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
  if (getSortDirection() == "descending") {
    sorted.reverse();
  }
  return sorted;
}
