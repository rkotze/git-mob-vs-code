const vscode = require("vscode");

function tweetCommand() {
  return vscode.commands.registerCommand("gitmob.tweet", function () {
    vscode.env.openExternal(
      vscode.Uri.parse(
        "https://twitter.com/intent/tweet?hashtags=GitHub,VSCode&text=I%20use%20Git%20Mob%20for%20co-authoring%20commits.%20Try%20it%20out:%20https://marketplace.visualstudio.com/items?itemName=RichardKotze.git-mob"
      )
    );
  });
}

exports.tweetCommand = tweetCommand;
