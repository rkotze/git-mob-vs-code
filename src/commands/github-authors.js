const vscode = require("vscode");
const { get } = require("../github/github-api");
const { getGitHubPat } = require("../ext-config/config");
const { saveNewCoAuthors } = require("../git/git-mob-api");

function searchGithubAuthors() {
  return vscode.commands.registerCommand(
    "gitmob.searchGithubAuthors",
    async function () {
      const gitHubPat = getGitHubPat();
      if (!gitHubPat) {
        vscode.window.showErrorMessage(
          "Missing GitHub PAT. Update settings with valid PAT."
        );
        return;
      }
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
      const users = await Promise.all(
        searchUsers.data.items.map((item) => get(item.url))
      );

      if (searchUsers.data.total_count === 0) {
        vscode.window.showInformationMessage("No users found!");
        return;
      }
      const messageUnder30 = `Git Mob: Showing ${searchUsers.data.total_count} GitHub users.`;
      const messageOver30 = `Git Mob: Can only showing 30 of ${searchUsers.data.total_count} GitHub users.`;
      vscode.window.showInformationMessage(
        (searchUsers.data.total_count > 30 ? messageOver30 : messageUnder30) +
          " Please select users with an email."
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
  const authorTextArray = repoAuthors.map(({ data }) => ({
    label: `${data.name} ${data.login}`,
    description: `<${data.email ? data.email : "no email"}>`,
    repoAuthor: { ...data, key: data.login },
  }));
  return await vscode.window.showQuickPick(authorTextArray, {
    matchOnDescription: true,
  });
}

exports.searchGithubAuthors = searchGithubAuthors;
