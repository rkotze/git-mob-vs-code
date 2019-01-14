const vscode = require("vscode");
const { CONSTANTS } = require("./constants");

function reloadOnSave(coAuthorProvider) {
  const { onDidSaveTextDocument } = vscode.workspace;

  onDidSaveTextDocument(function(textDocument) {
    if (textDocument.fileName.includes(CONSTANTS.GIT_COAUTHORS_FILE)) {
      coAuthorProvider.mobAuthors.reset();
      coAuthorProvider.reloadData();
    }
  });
}

exports.reloadOnSave = reloadOnSave;
