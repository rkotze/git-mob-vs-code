const { CONSTANTS } = require("./constants");

function reloadOnSave(coAuthorProvider) {
  return function(textDocument) {
    if (textDocument.fileName.includes(CONSTANTS.GIT_COAUTHORS_FILE)) {
      coAuthorProvider.mobAuthors.reset();
      coAuthorProvider.reloadData();
    }
  };
}

exports.reloadOnSave = reloadOnSave;
