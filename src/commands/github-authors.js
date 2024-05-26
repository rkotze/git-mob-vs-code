const vscode = require("vscode");
const {
  saveNewCoAuthors,
  searchGitHubAuthors: gmSearchGhAuthors,
} = require("git-mob-core");

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
      let users = [];
      try {
        users = await gmSearchGhAuthors(searchText, "vs-code-git-mob");
      } catch (error) {
        vscode.window.showErrorMessage(error.message);
        return;
      }

      if (users.length === 0) {
        vscode.window.showInformationMessage("No users found!");
        return;
      }

      const messageUnder30 = `Git Mob: Found ${users.length} GitHub users.`;
      const messageOver30 = `Git Mob: More GitHub users found but limited to show 30 GitHub users.`;
      vscode.window.showInformationMessage(
        users.length === 30 ? messageOver30 : messageUnder30
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
  const authorTextArray = repoAuthors.map((mobAuthor) => {
    return {
      label: `${mobAuthor.name} ${mobAuthor.key}`,
      description: `<${mobAuthor.email}>`,
      repoAuthor: mobAuthor,
    };
  });
  return await vscode.window.showQuickPick(authorTextArray, {
    matchOnDescription: true,
  });
}

exports.searchGithubAuthors = searchGithubAuthors;
