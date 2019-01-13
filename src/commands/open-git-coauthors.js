const os = require("os");
const path = require("path");
const vscode = require("vscode");

function openGitCoAuthor({ coAuthorProvider }) {
  let openFile = vscode.commands.registerCommand(
    "gitmob.openGitCoauthor",
    async function() {
      const { openTextDocument } = vscode.workspace;
      const { showTextDocument } = vscode.window;

      try {
        const pathToCoauthors = vscode.Uri.file(
          path
            .join(os.homedir(), ".git-coauthors")
            .replace(/^[a-z]:[\\]|[\/]/gi, "")
        );
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
