const vscode = require("vscode");

function setContextNotInstalled(notInstalled) {
  vscode.commands.executeCommand(
    "setContext",
    "gitmob.notInstalled",
    notInstalled
  );
}

exports.setContextNotInstalled = setContextNotInstalled;
