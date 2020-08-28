const vscode = require("vscode");
const { fetch } = require("../github/fetch");
// const { addRepoAuthor } = require("../git/commands");
// const { GitExt } = require("../vscode-git-extension/git-ext");

function searchGithubAuthors() {
  // const { mobAuthors } = coAuthorProvider;
  return vscode.commands.registerCommand(
    "gitmob.searchGithubAuthors",
    async function () {
      const result = await fetch("search/users?q=richard kotze");
      console.log(JSON.parse(result));
    }
  );
}

exports.searchGithubAuthors = searchGithubAuthors;
