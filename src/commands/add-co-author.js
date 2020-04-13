const vscode = require("vscode");
const { addRepoAuthor } = require("../git/commands");

function addRepoAuthorToCoauthors({ coAuthorProvider }) {
  const { context } = coAuthorProvider;
  let disposableAddRepoAuthor = vscode.commands.registerCommand(
    "gitmob.addRepoAuthorToCoAuthors",
    async function (author) {
      if (author) {
        addRepoAuthor(author);
        vscode.commands.executeCommand("gitmob.reload");
      } else {
        const newAuthor = await inputAuthorData();
        if (newAuthor) {
          addRepoAuthor(newAuthor);
          vscode.commands.executeCommand("gitmob.reload");
        }
      }
    }
  );

  context.subscriptions.push(disposableAddRepoAuthor);
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
  const commandKey = await vscode.window.showInputBox({
    prompt: "Author initials (Required)",
    validateInput: isRequired("Author initials"),
  });

  if (anyUndefined(name, email, commandKey)) return null;

  return {
    name,
    email,
    commandKey,
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
