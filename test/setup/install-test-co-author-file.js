const {
  createCoAuthorsFile,
  pathToCoAuthors,
  Author,
} = require("git-mob-core");

const authorList = [
  new Author("rk", "Richard Kotze", "richk@gitmob.com"),
  new Author("di", "Dennis", "dennis@gitmob.com"),
  new Author("sw", "Scarlet Witch", "scalet-w@gitmob.com"),
];

async function installTestCoAuthorFile() {
  try {
    await createCoAuthorsFile(authorList);
  } catch (error) {
    throw new Error(`Failed to create new "${await pathToCoAuthors()}" file`);
  }
}

exports.installTestCoAuthorFile = installTestCoAuthorFile;
