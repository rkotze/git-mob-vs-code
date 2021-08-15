const path = require("path");

const { gitMessagePath } = require("./git-message/message-path");
const { config } = require("../commands");
const { topLevelDirectory } = require("../git-rev-parse");

function setCommitTemplate() {
  if (!config.has("commit.template")) {
    config.set("commit.template", resolveGitMessagePath());
  }
}

function resolveGitMessagePath() {
  return (
    process.env.GITMOB_MESSAGE_PATH ||
    path.resolve(topLevelDirectory(), config.get("commit.template")) ||
    path.relative(topLevelDirectory(), gitMessagePath())
  );
}

module.exports = {
  resolveGitMessagePath,
  setCommitTemplate,
};
