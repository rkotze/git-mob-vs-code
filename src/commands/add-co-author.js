const vscode = require("vscode");
const { addNewCoAuthor } = require("../git/git-mob-api");

function addRepoAuthorToCoauthors() {
  return vscode.commands.registerCommand(
    "gitmob.addRepoAuthorToCoAuthors",
    async function (author) {
      if (author) {
        await addNewCoAuthor({ ...author, key: author.commandKey });
        await vscode.commands.executeCommand("gitmob.reload");
      } else {
        const newAuthor = await inputAuthorData();
        if (newAuthor) {
          await addNewCoAuthor(newAuthor);
          vscode.window.showInformationMessage(
            `Git Mob: "${newAuthor.name}" added to co-authors.`
          );
          vscode.commands.executeCommand("gitmob.reload");
        }
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
  const key = await vscode.window.showInputBox({
    prompt: "Author initials (Required)",
    validateInput: isRequired("Author initials"),
  });

  if (anyUndefined(name, email, key)) return null;

  return {
    name,
    email,
    key,
  };
}

function isRequired(fieldName) {
  return (value) => {
    if (value.length === 0) return `${fieldName} is required.`;
  };
}

function anyUndefined(...args) {
  return args.some((value) => typeof value === "undefined");
}

exports.addRepoAuthorToCoauthors = addRepoAuthorToCoauthors;
