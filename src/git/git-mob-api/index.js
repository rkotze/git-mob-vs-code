const { mob } = require("../commands");
const { gitAuthors } = require("./git-authors");

async function getAllAuthors() {
  const gitMobAuthors = gitAuthors();
  return gitMobAuthors.toList(await gitMobAuthors.read());
}

function addCoAuthors(keys) {
  mob.removeGitMobSection();
}

module.exports = {
  addCoAuthors,
  getAllAuthors,
};
