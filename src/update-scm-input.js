const os = require("os");
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");

exports.updateSCMInput = function updateSCMInput(coAuthors) {
  const gitExt = vscode.extensions.getExtension("vscode.git").exports;
  if (gitExt) {
    const firstRepository = gitExt.getAPI(1).repositories[0];
    const inputBox = firstRepository.inputBox;
    inputBox.value = replaceCoAuthors(
      inputBox.value,
      formatCoAuthors(coAuthors)
    );
  }
};

function replaceCoAuthors(currentText, coAuthors) {
  const noCoAuthors = currentText.replace(/Co-authored-by.*(\r\n|\r|\n)*/g, "");
  if (prepareCommitMsgTemplate()) return noCoAuthors;
  return noCoAuthors + coAuthors;
}

function formatCoAuthors(authors) {
  return authors
    .filter(author => author.selected)
    .map(author => author.format())
    .join(os.EOL);
}

function prepareCommitMsgTemplate() {
  const hookPath = path.join(
    vscode.workspace.rootPath,
    ".git",
    ".git-mob-template"
  );
  return fs.existsSync(hookPath);
}
