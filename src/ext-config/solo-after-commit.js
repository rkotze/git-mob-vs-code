const { watchForCommit } = require("../git/watch-for-commit");
const { mob } = require("../git/commands");

exports.soloAfterCommit = function soloAfterCommit(coAuthorProvider) {
  watchForCommit(function () {
    mob.solo();
    coAuthorProvider.reloadData();
  });
};
