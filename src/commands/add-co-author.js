const vscode = require("vscode");
const { addRepoAuthor } = require("../git/commands");

function addRepoAuthorToCoauthors({ coAuthorProvider }) {
  const { context } = coAuthorProvider;
  let disposableAddRepoAuthor = vscode.commands.registerCommand(
    "gitmob.addRepoAuthorToCoAuthors",
    async function (author) {
      if (author) {
        addRepoAuthor(author);
      } else {
        addRepoAuthor(await inputAuthorData());
      }
      vscode.commands.executeCommand("gitmob.reload");
    }
  );

  context.subscriptions.push(disposableAddRepoAuthor);
}

async function inputAuthorData() {
  const name = await vscode.window.showInputBox({
    prompt: "Author name",
  });
  const email = await vscode.window.showInputBox({
    prompt: "Author email",
  });
  const commandKey = await vscode.window.showInputBox({
    prompt: "Author initials",
  });

  return {
    name,
    email,
    commandKey,
  };
}

exports.addRepoAuthorToCoauthors = addRepoAuthorToCoauthors;
