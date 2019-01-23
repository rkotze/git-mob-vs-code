const os = require("os");
const vscode = require("vscode");
const { hasPrepareCommitMsgTemplate } = require("./prepareCommitMsgFile");

exports.updateSCMInput = function updateSCMInput(coAuthors) {
  const gitExt = vscode.extensions.getExtension("vscode.git");
  if (gitExt && gitExt.isActive) {
    const api = gitExt.exports.getAPI(1);
    if (api.repositories.length) {
      const firstRepository = api.repositories[0];
      const inputBox = firstRepository.inputBox;
      inputBox.value = replaceCoAuthors(
        inputBox.value,
        formatCoAuthors(coAuthors)
      );
    }
  }
};

function replaceCoAuthors(currentText, coAuthors) {
  const noCoAuthors = currentText.replace(/Co-authored-by.*(\r\n|\r|\n)*/g, "");
  if (hasPrepareCommitMsgTemplate()) return noCoAuthors;
  return noCoAuthors + coAuthors;
}

function formatCoAuthors(authors) {
  return authors
    .filter(author => author.selected)
    .map(author => author.format())
    .join(os.EOL);
}
