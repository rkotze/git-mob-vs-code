const vscode = require("vscode");

function useTemplateCommand({ context }) {
  let disposableGitTemplate = vscode.commands.registerCommand(
    "gitmob.useTemplate",
    function() {}
  );
  context.subscriptions.push(disposableGitTemplate);
}

exports.useTemplateCommand = useTemplateCommand;
