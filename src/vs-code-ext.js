const vscode = require("vscode");

exports = function vsCodeExtention() {
  const gitExt = vscode.extensions.getExtension("vscode.git");
  if (gitExt) {
    const repos = gitExt.exports.getRepositories();
    repos.then(function(rep) {
      rep[0].inputBox.value = "Co-authors";
    });
  }
};
