const vscode = require("vscode");
const { mob } = require("../git/commands");

function changePrimaryAuthor({ coAuthorProvider }) {
  const { mobAuthors } = coAuthorProvider;
  return vscode.commands.registerCommand(
    "gitmob.changePrimaryAuthor",
    async function () {
      const allCoAuthors = await mobAuthors.listAll;
      const selected = await quickPickFromCoAuthors(allCoAuthors);
      if (selected) {
        mob.changeAuthor(selected.authorKey);
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
  return await vscode.window.showQuickPick(authorTextArray);
}
