const fs = require("fs");
const path = require("path");
const { GitExt } = require("../vscode-git-extension/git-ext");

exports.watchForCommit = function watchForCommit(cb) {
  const gitExt = new GitExt();
  const gitCommit = path.join(gitExt.rootPath, ".git", "COMMIT_EDITMSG");

  return fs.watch(gitCommit, function (evt, filename) {
    if (filename) {
      if (debounceFsWatch()) return;
      cb(evt);
    }
  });
};

let fsWait = false;
function debounceFsWatch() {
  if (fsWait) return true;
  fsWait = setTimeout(() => {
    fsWait = false;
  }, 1000); // windows is a bit slower
}
