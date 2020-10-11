const vscode = require("vscode");
const { mob } = require("./git/commands");

function installPrompt(successCallback) {
  const options = {
    g: "-g git-mob",
    l: "-D git-mob",
    later: "Later",
  };
  vscode.window
    .showInformationMessage(
      "Git Mob requires Node package git-mob cli. Please install globally `-g` or local dev `-D`.",
      ...Object.values(options)
    )
    .then((answer) => {
      if (answer === options.later) return answer;
      return mob.installGitMob(answer === "-D git-mob");
    })
    .then((result) => {
      if (result === options.later) return false;
      successCallback();
    });
}
exports.installPrompt = installPrompt;
