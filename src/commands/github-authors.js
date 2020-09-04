const vscode = require("vscode");
const { get } = require("../github/github-api");
// const { addRepoAuthor } = require("../git/commands");
// const { GitExt } = require("../vscode-git-extension/git-ext");

function searchGithubAuthors() {
  // const { mobAuthors } = coAuthorProvider;
  return vscode.commands.registerCommand(
    "gitmob.searchGithubAuthors",
    async function () {
      const result = await get("search/users?q=richard kotze");
      console.log(result);
    }
  );
}

exports.searchGithubAuthors = searchGithubAuthors;
