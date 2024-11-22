const vscode = require("vscode");
const { CONSTANTS } = require("./constants");

function reloadOnSave() {
  const { onDidSaveTextDocument } = vscode.workspace;

  onDidSaveTextDocument(async function (textDocument) {
    if (textDocument.fileName.includes(CONSTANTS.GIT_COAUTHORS_FILE)) {
      await vscode.commands.executeCommand("gitmob.reload");
    }
  });
}

exports.reloadOnSave = reloadOnSave;
