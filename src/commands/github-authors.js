const vscode = require("vscode");
const { get } = require("../github/github-api");
const { addRepoAuthor } = require("../git/commands");

function searchGithubAuthors() {
  return vscode.commands.registerCommand(
    "gitmob.searchGithubAuthors",
    async function () {
      const searchText = await vscode.window.showInputBox({
        placeHolder: "Try the name of person, email or username",
        validateInput(value) {
          if (value && value.length < 2) {
            return "Enter at least one character";
          }
          return null;
        },
      });
      const searchUsers = await get("search/users?q=" + searchText);
      const users = await Promise.all(
        searchUsers.data.items.map((item) => get(item.url))
      );
      const selectedAuthor = await quickPickAuthors(users);
      if (selectedAuthor) {
        addRepoAuthor(selectedAuthor.repoAuthor);
        await vscode.commands.executeCommand("gitmob.reload");
      }
    }
  );
}

async function quickPickAuthors(repoAuthors) {
  const authorTextArray = repoAuthors.map(({ data }) => ({
    label: `${data.name} ${data.login}`,
    description: `<${data.email}>`,
    repoAuthor: { ...data, commandKey: data.login },
  }));
  return await vscode.window.showQuickPick(authorTextArray);
}

exports.searchGithubAuthors = searchGithubAuthors;
