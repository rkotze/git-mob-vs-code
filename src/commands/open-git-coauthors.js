const vscode = require("vscode");
const { logIssue } = require("../errors/log-issue");
const { pathToCoAuthors } = require("git-mob-core");

function openGitCoAuthor() {
  return vscode.commands.registerCommand(
    "gitmob.openGitCoauthor",
    async function () {
      const { openTextDocument } = vscode.workspace;
      const { showTextDocument } = vscode.window;

      try {
        const coauthorsFile = vscode.Uri.file(pathToCoAuthors());
        const doc = await openTextDocument(coauthorsFile);
        showTextDocument(doc);
      } catch (err) {
        logIssue("GitMob error: " + err);
      }
    }
  );
}

exports.openGitCoAuthor = openGitCoAuthor;
