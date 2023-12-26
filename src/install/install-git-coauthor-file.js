const { createCoAuthorsFile } = require("git-mob-core");

async function installGitCoAuthorFile() {
  try {
    if (await createCoAuthorsFile()) {
      console.log("Co-authors file created!");
    }
  } catch (error) {
    if (!error.message.includes("file exists")) {
      throw new Error(
        "Error:Something went wrong creating new .git-coauthors file."
      );
    }
  }
}

module.exports = {
  installGitCoAuthorFile,
};
