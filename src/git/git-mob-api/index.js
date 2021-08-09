const path = require("path");
const { mob, config } = require("../commands");
const { topLevelDirectory } = require("../git-rev-parse");
const { gitAuthors } = require("./git-authors");
const { gitMessage } = require("./git-message");
const { gitMessagePath } = require("./git-message/message-path");

async function getAllAuthors() {
  const gitMobAuthors = gitAuthors();
  return gitMobAuthors.toList(await gitMobAuthors.read());
}

async function addCoAuthors(keys) {
  setCommitTemplate();
  mob.removeGitMobSection();
  const selectedAuthors = getSelectedAuthors(keys, getAllAuthors());
  for (const author of selectedAuthors) {
    mob.gitAddCoAuthor(author.toString());
  }
  const gitTemplate = gitMessage(
    commitTemplatePath(config.get("commit.template"))
  );
  await gitTemplate.writeCoAuthors(selectedAuthors);
  return selectedAuthors;
}

function getSelectedAuthors(keys, authorMap) {
  return keys.map((key) => authorMap.get(key));
}

function setCommitTemplate() {
  if (!config.has("commit.template")) {
    config.set("commit.template", commitTemplatePath());
  }
}

function commitTemplatePath() {
  return (
    process.env.GITMOB_MESSAGE_PATH ||
    path.resolve(topLevelDirectory(), config.get("commit.template")) ||
    path.relative(topLevelDirectory(), gitMessagePath())
  );
}

module.exports = {
  addCoAuthors,
  getAllAuthors,
};
