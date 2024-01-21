const vscode = require("vscode");
const { setPrimaryAuthor } = require("git-mob-core");

function changePrimaryAuthor({ coAuthorProvider }) {
  const { coAuthorGroups } = coAuthorProvider;
  return vscode.commands.registerCommand(
    "gitmob.changePrimaryAuthor",
    async function () {
      const allCoAuthors = [
        ...coAuthorGroups.getSelected(),
        ...coAuthorGroups.getUnselected(),
      ];
      const selectedAuthor = await quickPickFromCoAuthors(allCoAuthors);
      if (selectedAuthor) {
        await setPrimaryAuthor(selectedAuthor);
        await vscode.commands.executeCommand("gitmob.reload");
      }
    }
  );
}

exports.changePrimaryAuthor = changePrimaryAuthor;

async function quickPickFromCoAuthors(repoAuthors) {
  const authorTextArray = repoAuthors.map((author) => ({
    label: author.name,
    description: author.email,
    authorKey: author.commandKey,
  }));
  const selected = await vscode.window.showQuickPick(authorTextArray);
  if (selected) {
    return repoAuthors.find(
      (author) => selected.authorKey === author.commandKey
    );
  }
  return null;
}
