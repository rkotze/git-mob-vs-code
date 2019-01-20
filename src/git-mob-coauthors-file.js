const os = require("os");
const path = require("path");

const coAuthorsFile = {
  get file() {
    return ".git-coauthors";
  },

  get path() {
    return path
      .join(os.homedir(), this.file)
      .replace(/^([a-z]:[\\]|[\/])/gi, "");
  }
};

exports.coAuthorsFile = coAuthorsFile;
