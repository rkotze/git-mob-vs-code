const vscode = require("vscode");
const { get } = require("../github/github-api");
// const { addRepoAuthor } = require("../git/commands");
// const { GitExt } = require("../vscode-git-extension/git-ext");

function searchGithubAuthors() {
  // const { mobAuthors } = coAuthorProvider;
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
      const result = await get("search/users?q=" + searchText);
      console.log(result);
    }
  );
}

exports.searchGithubAuthors = searchGithubAuthors;
