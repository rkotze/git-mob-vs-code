const path = require("path");
const { gitPath, topLevelDirectory } = require("../../git-rev-parse");

function commitTemplatePath(fromRootPath) {
  return (
    process.env.GITMOB_MESSAGE_PATH ||
    path.resolve(topLevelDirectory(), fromRootPath) ||
    path.resolve(topLevelDirectory(), gitMessagePath())
  );
}

function gitMessagePath() {
  return process.env.GITMOB_MESSAGE_PATH || gitPath(".gitmessage");
}

module.exports = {
  commitTemplatePath,
  gitMessagePath,
};
