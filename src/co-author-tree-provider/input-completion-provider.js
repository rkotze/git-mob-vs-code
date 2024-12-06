const vscode = require("vscode");

class InputCompletionProvider {
  constructor(coAuthorProvider) {
    this.disposables = [];
    this.disposables.push(
      vscode.languages.registerCompletionItemProvider("scminput", this, "+")
    );
    this.coAuthorProvider = coAuthorProvider;
  }

  provideCompletionItems() {
    // (document, position, token, context) {
    // const range = document.getWordRangeAtPosition(position);
    // const word = document.getText(range);

    // if (!this.authors) {
    return buildCompletionItems(
      this.coAuthorProvider.coAuthorGroups.getUnselected()
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

function buildCompletionItems(unselectAuthors) {
  const items = unselectAuthors.map((author) => {
    const item = new vscode.CompletionItem(
      author.toString(),
      vscode.CompletionItemKind.User
    );
    // var a = new vscode.Range();
    // item.range.inserting = range;
    // item.range.start.character = item.range.start.character - 1;
    item.author = author;
    item.insertText = author.format();
    return item;
  });
  return items;
}

exports.InputCompletionProvider = InputCompletionProvider;
