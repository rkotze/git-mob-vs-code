const vscode = require("vscode");
const { CoAuthor } = require("../co-author-tree-provider/co-authors");
const { moveToCoAuthoring } = require("../ext-config/config");
const { saveNewCoAuthors } = require("git-mob-core");

function addRepoAuthorToCoauthors({ coAuthorProvider }) {
  return vscode.commands.registerCommand(
    "gitmob.addRepoAuthorToCoAuthors",
    async function (author) {
      const moveToSelected = moveToCoAuthoring();

      if (author) {
        await saveNewCoAuthors([{ ...author, key: author.commandKey }]);
        const coAuthor = new CoAuthor(
          author.name,
          author.email,
          false,
          author.commandKey
        );
        coAuthorProvider.coAuthorGroups.addNew([coAuthor]);
        if (moveToSelected) {
          await coAuthorProvider.toggleCoAuthor(coAuthor, true);
        }
      } else {
        const newAuthor = await inputAuthorData();
        if (newAuthor) {
          await saveNewCoAuthors([newAuthor]);
          const coAuthor = new CoAuthor(
            newAuthor.name,
            newAuthor.email,
            false,
            newAuthor.key
          );
          coAuthorProvider.coAuthorGroups.addNew([coAuthor]);
          if (moveToSelected) {
            await coAuthorProvider.toggleCoAuthor(coAuthor, true);
          }
        }
      }

      if (!moveToSelected) {
        coAuthorProvider.reloadData();
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
