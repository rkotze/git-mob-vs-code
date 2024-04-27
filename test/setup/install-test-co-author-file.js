const { gitAuthors, pathToCoAuthors } = require("./git-authors");

const testCoAuthors = {
  coauthors: {
    rk: {
      name: "Richard Kotze",
      email: "richk@gitmob.com",
    },
    di: {
      name: "Dennis",
      email: "dennis@gitmob.com",
    },
    sw: {
      name: "Scarlet Witch",
      email: "scalet-w@gitmob.com",
    },
  },
};

async function installTestCoAuthorFile() {
  const coAuthors = gitAuthors();
  try {
    await coAuthors.overwrite(testCoAuthors);
  } catch {
    throw new Error(`Failed to install new "${pathToCoAuthors()}" file`);
  }
}

exports.installTestCoAuthorFile = installTestCoAuthorFile;
