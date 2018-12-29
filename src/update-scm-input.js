const os = require("os");
const vscode = require("vscode");

exports.updateSCMInput = function updateSCMInput(coAuthors) {
  const gitExt = vscode.extensions.getExtension("vscode.git");
  if (gitExt) {
    const repos = gitExt.exports.getRepositories();
    repos.then(function(rep) {
      const inputBox = rep[0].inputBox;
      inputBox.value = replaceCoAuthors(
        inputBox.value,
        formatCoAuthors(coAuthors)
      );
    });
  }
};

function replaceCoAuthors(currentText, coAuthors) {
  return currentText.replace(/Co-authored-by.*(\r\n|\r|\n)*/g, "") + coAuthors;
}

function formatCoAuthors(authors) {
  return authors
    .filter(author => author.selected)
    .map(author => author.format())
    .join(os.EOL);
}

// function prepareCommitMsgTemplate() {
//   const mobTemplate = revParse.gitPath(".git-mob-template");
//   return fs.existsSync(mobTemplate);
// }
