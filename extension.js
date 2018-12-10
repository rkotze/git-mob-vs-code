// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const { GitMob } = require("./src/git-mob-list");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function activate(context) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

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
