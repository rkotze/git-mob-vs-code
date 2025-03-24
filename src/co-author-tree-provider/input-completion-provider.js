const vscode = require("vscode");
const {
  getInputCompletionConfig,
  ENABLE_INPUT_AUTOCOMPLETION,
} = require("../ext-config/config");

class InputCompletionProvider {
  constructor(coAuthorProvider) {
    this.coAuthorProvider = coAuthorProvider;
    this.disposables = [];
    this.registerProvider();

    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(ENABLE_INPUT_AUTOCOMPLETION)) {
        this.registerProvider();
      }
    });
  }

  registerProvider() {
    this.dispose();
    if (getInputCompletionConfig()) {
      this.disposables.push(
        vscode.languages.registerCompletionItemProvider("scminput", this, "+")
      );
    }
  }

  provideCompletionItems(_doc, position) {
    return buildCompletionItems(
      this.coAuthorProvider.coAuthorGroups.getUnselected(),
      position
    );
  }

  resolveCompletionItem(item) {
    item.command = {
      command: "gitmob.addCoAuthor",
      arguments: [item.author],
      title: "Add co-author",
    };
    return item;
  }

  dispose() {
    this.disposables.forEach((d) => d.dispose());
    this.disposables = [];
  }
}

function buildCompletionItems(unselectAuthors, position) {
  const items = unselectAuthors.map((author) => {
    const item = new vscode.CompletionItem(
      author.toString(),
      vscode.CompletionItemKind.User
    );

    const removeTriggerChar = new vscode.Range(
      position.line,
      position.character - 1,
      position.line,
      position.character
    );
    item.additionalTextEdits = [vscode.TextEdit.delete(removeTriggerChar)];

    item.author = author;
    item.insertText = author.format();
    return item;
  });
  return items;
}

exports.InputCompletionProvider = InputCompletionProvider;
