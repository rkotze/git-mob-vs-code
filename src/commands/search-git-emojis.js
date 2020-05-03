const vscode = require("vscode");
const { GitExt } = require("../vscode-git-extension/git-ext");
const gitEmojisJson = require("../git-emojis/gitmojis.json");

function searchGitEmojis() {
  return vscode.commands.registerCommand(
    "gitmob.searchGitEmojis",
    async function () {
      const emoji = await quickPickEmojis();
      if (emoji) {
        const gitExt = new GitExt();
        gitExt.updateSelectedInput(function (value) {
          return emoji.code + value;
        });
      }
    }
  );
}

exports.searchGitEmojis = searchGitEmojis;

async function quickPickEmojis() {
  const emojiList = gitEmojisJson.gitmojis.map((emoji) => ({
    label: `${emoji.emoji} ${emoji.name}`,
    description: emoji.description,
    code: emoji.code,
  }));
  return await vscode.window.showQuickPick(emojiList, {
    matchOnDescription: true,
    placeHolder: "Select emoji to add to source control input box",
  });
}
