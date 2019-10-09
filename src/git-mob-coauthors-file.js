const os = require("os");
const path = require("path");
const { CONSTANTS } = require("./constants");

const coAuthorsFile = {
  get file() {
    return CONSTANTS.GIT_COAUTHORS_FILE;
  },

  get path() {
    if (process.env.GITMOB_COAUTHORS_PATH)
      return process.env.GITMOB_COAUTHORS_PATH;

    return path.join(os.homedir(), this.file);
  }
};

exports.coAuthorsFile = coAuthorsFile;
