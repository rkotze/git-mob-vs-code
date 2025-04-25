const vscode = require("vscode");
const { Author, setPrimaryAuthor } = require("git-mob-core");

function addMainAuthor() {
  return vscode.commands.registerCommand(
    "gitmob.addMainAuthor",
    async function () {
      const newAuthor = await inputAuthorData();
      if (newAuthor) {
        await setPrimaryAuthor(
          new Author("author", newAuthor.name, newAuthor.email)
        );
        await vscode.commands.executeCommand("gitmob.reload");
      }
    }
  );
}

async function inputAuthorData() {
  const name = await vscode.window.showInputBox({
    prompt: "Author name (Required)",
    validateInput: isRequired("Author name"),
  });
  const email = await vscode.window.showInputBox({
    prompt: "Author email (Required)",
    validateInput: isRequired("Author email"),
  });

  if (anyUndefined(name, email)) return null;

  return new Author("author", name, email);
}

function isRequired(fieldName) {
  return (value) => {
    if (value.length === 0) return `${fieldName} is required.`;
  };
}

function anyUndefined(...args) {
  return args.some((value) => typeof value === "undefined");
}

exports.addMainAuthor = addMainAuthor;
