const { mob, config } = require("../commands");
const { Author } = require("./author");
const { gitAuthors } = require("./git-authors");
const { gitMessage } = require("./git-message");
const {
  resolveGitMessagePath,
  setCommitTemplate,
} = require("./resolve-git-message-path");

async function getAllAuthors() {
  const gitMobAuthors = gitAuthors();
  return gitMobAuthors.toList(await gitMobAuthors.read());
}

async function applyCoAuthors(keys) {
  setCommitTemplate();
  await solo();
  const selectedAuthors = getSelectedAuthors(keys, await getAllAuthors());
  for (const author of selectedAuthors) {
    mob.gitAddCoAuthor(author.toString());
  }
  const gitTemplate = gitMessage(
    resolveGitMessagePath(config.get("commit.template"))
  );
  await gitTemplate.writeCoAuthors(selectedAuthors);
  return selectedAuthors;
}

function getSelectedAuthors(keys, authorMap) {
  return authorMap.filter((author) => keys.includes(author.key));
}

async function solo() {
  mob.removeGitMobSection();
  const gitTemplate = gitMessage(
    resolveGitMessagePath(config.get("commit.template"))
  );
  return gitTemplate.removeCoAuthors();
}

function primaryAuthor() {
  const name = config.get("user.name");
  const email = config.get("user.email");

  if (name && email) {
    return new Author("prime", name, email);
  }
  return null;
}

module.exports = {
  applyCoAuthors,
  getAllAuthors,
  solo,
  primaryAuthor,
};
