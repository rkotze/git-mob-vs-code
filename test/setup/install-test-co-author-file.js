const { createCoAuthorsFile, Author } = require("git-mob-core");

const authorList = [
  new Author("rk", "Richard Kotze", "richk@gitmob.com"),
  new Author("di", "Dennis", "dennis@gitmob.com"),
  new Author("sw", "Scarlet Witch", "scalet-w@gitmob.com"),
];

async function installTestCoAuthorFile() {
  await createCoAuthorsFile(authorList);
}

exports.installTestCoAuthorFile = installTestCoAuthorFile;
