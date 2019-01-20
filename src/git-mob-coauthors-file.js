const os = require("os");
const path = require("path");

const coAuthorsFile = {
  get path() {
    return path
      .join(os.homedir(), ".git-coauthors")
      .replace(/^[a-z]:[\\]|[\/]/gi, "");
  }
};

exports.coAuthorsFile = coAuthorsFile;
