const vscode = require("vscode");
const { get } = require("../github/github-api");
const { saveNewCoAuthors } = require("git-mob-core");
const { composeGitHubUser } = require("../github/compose-github-user");

function searchGithubAuthors() {
  return vscode.commands.registerCommand(
    "gitmob.searchGithubAuthors",
    async function () {
      const searchText = await vscode.window.showInputBox({
        placeHolder: "Try the name of person, email or username",
        validateInput(value) {
          if (value.length === 0) {
            return "Enter at least one character";
          }
          return null;
        },
      });

      if (typeof searchText === "undefined") return null;

      const searchUsers = await get("search/users?q=" + searchText);
      let users = [];
      if (searchUsers.statusCode <= 400) {
        users = await Promise.all(
          searchUsers.data.items.map((item) => get(item.url))
        );
      } else {
        vscode.window.showErrorMessage(
          "Request to GitHub failed: " + searchUsers.data.message
        );
        return;
      }

      if (searchUsers.data.total_count === 0) {
        vscode.window.showInformationMessage("No users found!");
        return;
      }
      const messageUnder30 = `Git Mob: Showing ${searchUsers.data.total_count} GitHub users.`;
      const messageOver30 = `Git Mob: Can only showing 30 of ${searchUsers.data.total_count} GitHub users.`;
      vscode.window.showInformationMessage(
        searchUsers.data.total_count > 30 ? messageOver30 : messageUnder30
      );

      const selectedAuthor = await quickPickAuthors(users);
      if (selectedAuthor) {
        if (!selectedAuthor.repoAuthor.email) {
          vscode.window.showErrorMessage("No email! Can't be added.");
        } else {
          await saveNewCoAuthors([selectedAuthor.repoAuthor]);
          await vscode.commands.executeCommand("gitmob.reload");
        }
      }
    }
  );
}

async function quickPickAuthors(repoAuthors) {
  const authorTextArray = repoAuthors.map(({ data }) => {
    const repoAuthor = composeGitHubUser(data);

    return {
      label: `${repoAuthor.name} ${repoAuthor.commandKey}`,
      description: `<${repoAuthor.email}>`,
      repoAuthor: { ...repoAuthor, key: repoAuthor.commandKey },
    };
  });
  return await vscode.window.showQuickPick(authorTextArray, {
    matchOnDescription: true,
  });
}

exports.searchGithubAuthors = searchGithubAuthors;
