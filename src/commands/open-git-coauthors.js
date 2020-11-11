const vscode = require("vscode");
const { logIssue } = require("../errors/log-issue");
const { coAuthorsFile } = require("../git-mob-coauthors-file");

function openGitCoAuthor() {
  return vscode.commands.registerCommand(
    "gitmob.openGitCoauthor",
    async function () {
      const { openTextDocument } = vscode.workspace;
      const { showTextDocument } = vscode.window;

      try {
        const pathToCoauthors = vscode.Uri.file(coAuthorsFile.path);
        const doc = await openTextDocument(pathToCoauthors);
        showTextDocument(doc);
      } catch (err) {
        logIssue("GitMob error: " + err);
      }
    }
  );
}

exports.openGitCoAuthor = openGitCoAuthor;
