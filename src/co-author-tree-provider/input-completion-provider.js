const vscode = require("vscode");

class InputCompletionProvider {
  constructor(coAuthorProvider) {
    this.disposables = [];
    this.disposables.push(
      vscode.languages.registerCompletionItemProvider("scminput", this, "+")
    );
    this.coAuthorProvider = coAuthorProvider;
  }

  provideCompletionItems(_doc, position) {
    // (document, position, token, context) {
    // const range = document.getWordRangeAtPosition(position);
    // const word = document.getText(range);

    // if (!this.authors) {
    return buildCompletionItems(
      this.coAuthorProvider.coAuthorGroups.getUnselected(),
      position
    );
    // }

    // return this.authors;
  }

  resolveCompletionItem(item) {
    // (item, _token) {
    item.command = {
      command: "gitmob.addCoAuthor",
      arguments: [item.author],
      title: "Add co-author",
    };
    return item;
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
