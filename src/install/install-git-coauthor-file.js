const {
  gitAuthors,
  gitCoauthorsPath,
} = require("../git/git-mob-api/git-authors");

const SAMPLE_CONTENT = {
  coauthors: {
    pah: {
      name: "Placeholder Author",
      email: "placeholder@author.com",
    },
  },
};

async function installGitCoAuthorFile() {
  const coAuthors = gitAuthors();
  if (!coAuthors.fileExists()) {
    try {
      await coAuthors.write(SAMPLE_CONTENT);
    } catch (error) {
      throw new Error(`Failed to add new "${gitCoauthorsPath}" file`);
    }
  }
}

module.exports = {
  installGitCoAuthorFile,
};
