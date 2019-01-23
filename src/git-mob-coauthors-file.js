const os = require("os");
const path = require("path");
const { GIT_COAUTHORS_FILE } = require("./constants");

const coAuthorsFile = {
  get file() {
    return GIT_COAUTHORS_FILE;
  },

  get path() {
    return path
      .join(os.homedir(), this.file)
      .replace(/^([a-z]:[\\]|[\/])/gi, "");
  }
};

exports.coAuthorsFile = coAuthorsFile;
