const vscode = require("vscode");
const { mob } = require("../git/commands");

function installCli(context, successCallBack) {
  const globalInstall = vscode.commands.registerCommand(
    "gitmob.installCliG",
    install(false, successCallBack)
  );
  const localInstall = vscode.commands.registerCommand(
    "gitmob.installCliL",
    install(true, successCallBack)
  );
  context.subscriptions.push(globalInstall);
  context.subscriptions.push(localInstall);
}

function install(local, successCallBack) {
  return async function () {
    vscode.window.showInformationMessage(
      `Installing Git Mob cli ${local ? "local dev" : "globally"}`
    );
    await mob.installGitMob(local);
    successCallBack();
  };
}

exports.installCli = installCli;
