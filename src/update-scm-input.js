const os = require("os");
const vscode = require("vscode");
const { hasPrepareCommitMsgTemplate } = require("./prepare-commit-msg-file");

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
  const noCoAuthors = currentText.replace(
    /(\r\n|\r|\n)*Co-authored-by.*(\r\n|\r|\n)*/g,
    ""
  );
  if (hasPrepareCommitMsgTemplate()) return noCoAuthors;

  if (coAuthors.length > 0) return noCoAuthors + os.EOL + os.EOL + coAuthors;

  return noCoAuthors + coAuthors;
}

function formatCoAuthors(authors) {
  return authors
    .filter(author => author.selected)
    .map(author => author.format())
    .join(os.EOL);
}
