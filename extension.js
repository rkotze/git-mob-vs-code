const vscode = require("vscode");
const { GitMob } = require("./src/git-mob-list");

function activate(context) {
  new GitMob(context);
  let disposable = vscode.commands.registerCommand(
    "gitmob.sayHello",
    function() {
      // The code you place here will be executed every time your command is executed
      console.log("args", arguments);
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World!");
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
