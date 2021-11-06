const vscode = require("vscode");
const { addNewCoAuthor } = require("../git/git-mob-api");

function addRepoAuthorToCoauthors({ coAuthorProvider }) {
  return vscode.commands.registerCommand(
    "gitmob.addRepoAuthorToCoAuthors",
    async function (author) {
      if (author) {
        await addNewCoAuthor({ ...author, key: author.commandKey });
        await updateAuthorUiList(coAuthorProvider, author);
        // await vscode.commands.executeCommand("gitmob.reload");
      } else {
        const newAuthor = await inputAuthorData();
        if (newAuthor) {
          await addNewCoAuthor(newAuthor);
          await updateAuthorUiList(coAuthorProvider, newAuthor);
          // vscode.commands.executeCommand("gitmob.reload");
        }
      }
    }
  );
}

async function updateAuthorUiList(coAuthorProvider, author) {
  coAuthorProvider.mobAuthors.reset();
  await coAuthorProvider.mobAuthors.listCurrent();
  await coAuthorProvider.toggleCoAuthor(author, true);
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
