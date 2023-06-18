const vscode = require("vscode");
const { setPrimaryAuthor } = require("git-mob-core");

function changePrimaryAuthor({ coAuthorProvider }) {
  const { mobAuthors } = coAuthorProvider;
  return vscode.commands.registerCommand(
    "gitmob.changePrimaryAuthor",
    async function () {
      const allCoAuthors = await mobAuthors.listAll();
      const selectedAuthor = await quickPickFromCoAuthors(allCoAuthors);
      if (selectedAuthor) {
        setPrimaryAuthor(selectedAuthor);
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
