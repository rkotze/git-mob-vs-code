const os = require("os");
const path = require("path");
const { CONSTANTS } = require("./constants");

const coAuthorsFile = {
  get file() {
    return CONSTANTS.GIT_COAUTHORS_FILE;
  },

  get path() {
    return path
      .join(os.homedir(), this.file)
      .replace(/^([a-z]:[\\]|[\/])/gi, "");
  }
};

exports.coAuthorsFile = coAuthorsFile;
