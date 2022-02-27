const vscode = require("vscode");

function copyCoAuthor() {
  return vscode.commands.registerCommand(
    "gitmob.copyCoAuthor",
    async function (author) {
      const { email, name } = author;
      await vscode.env.clipboard.writeText(`${name} <${email}>`);
    }
  );
}

exports.copyCoAuthor = copyCoAuthor;
