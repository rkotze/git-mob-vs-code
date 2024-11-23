const vscode = require("vscode");

class InputCompletionProvider {
  constructor() {
    this.disposables = [];
    this.disposables.push(
      vscode.languages.registerCompletionItemProvider("*", this, "+")
    );
  }

  provideCompletionItems(document, position, token, context) {
    // const range = document.getWordRangeAtPosition(position);
    // const word = document.getText(range);

    return [
      new vscode.CompletionItem("Option 1", vscode.CompletionItemKind.User),
      new vscode.CompletionItem(
        "Option amazing",
        vscode.CompletionItemKind.User
      ),
      new vscode.CompletionItem("Pick me", vscode.CompletionItemKind.User),
    ];
  }

  resolveCompletionItem(item, _token) {
    item.range.start.character = item.range.start.character - 1;
    return item;
  }
}

exports.InputCompletionProvider = InputCompletionProvider;
