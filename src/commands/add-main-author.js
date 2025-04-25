const vscode = require("vscode");
const { Author, setPrimaryAuthor } = require("git-mob-core");
const { inputAuthorData } = require("./shared/input-author-data");

function addMainAuthor() {
  return vscode.commands.registerCommand(
    "gitmob.addMainAuthor",
    async function () {
      const newAuthor = await inputAuthorData([
        { key: "name", label: "Author name" },
        { key: "email", label: "Author email" },
      ]);
      if (newAuthor) {
        await setPrimaryAuthor(
          new Author("author", newAuthor.name, newAuthor.email)
        );
        await vscode.commands.executeCommand("gitmob.reload");
      }
    }
  );
}

exports.addMainAuthor = addMainAuthor;
