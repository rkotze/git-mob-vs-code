const vscode = require("vscode");
const { coAuthorsFile } = require("../git-mob-coauthors-file");

function openGitCoAuthor({ coAuthorProvider }) {
  let openFile = vscode.commands.registerCommand(
    "gitmob.openGitCoauthor",
    async function() {
      const { openTextDocument } = vscode.workspace;
      const { showTextDocument } = vscode.window;

      try {
        const pathToCoauthors = vscode.Uri.file(coAuthorsFile.path);
        const doc = await openTextDocument(pathToCoauthors);
        showTextDocument(doc);
      } catch (err) {
        vscode.window.showErrorMessage("GitMob error: " + err);
      }
    }
  );

  coAuthorProvider.context.subscriptions.push(openFile);
}

exports.openGitCoAuthor = openGitCoAuthor;
