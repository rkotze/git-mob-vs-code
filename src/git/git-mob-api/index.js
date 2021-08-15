const { mob, config } = require("../commands");
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
  mob.removeGitMobSection();
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

module.exports = {
  applyCoAuthors,
  getAllAuthors,
};