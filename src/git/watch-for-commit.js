const fs = require("fs");
const path = require("path");
const { GitExt } = require("../vscode-git-extension/git-ext");

exports.watchForCommit = function watchForCommit(cb) {
  const gitExt = new GitExt();
  const gitCommit = path.join(gitExt.rootPath, ".git", "COMMIT_EDITMSG");
  let fsWait = false;
  fs.watch(gitCommit, function (evt, filename) {
    if (filename) {
      if (fsWait) return;
      fsWait = setTimeout(() => {
        fsWait = false;
      }, 100);
      cb(evt);
    }
  });
};
