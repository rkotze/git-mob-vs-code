const os = require("os");
const path = require("path");
const { CONSTANTS } = require("./constants");

const coAuthorsFile = {
  get file() {
    return CONSTANTS.GIT_COAUTHORS_FILE;
  },

  get rawPath() {
    if (process.env.GITMOB_COAUTHORS_PATH)
      return process.env.GITMOB_COAUTHORS_PATH;

    return path.join(os.homedir(), this.file);
  },

  get path() {
    return this.rawPath.replace(/^([a-z]:[\\]|[\/])/gi, "");
  }
};

exports.coAuthorsFile = coAuthorsFile;
