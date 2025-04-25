const vscode = require("vscode");

async function inputAuthorData(fields) {
  const authorData = {};

  for (const field of fields) {
    const value = await vscode.window.showInputBox({
      prompt: `${field.label} (Required)`,
      validateInput: isRequired(field.label),
    });
    if (typeof value === "undefined") return null;
    authorData[field.key] = value;
  }

  return authorData;
}

function isRequired(fieldName) {
  return (value) => {
    if (value.length === 0) return `${fieldName} is required.`;
  };
}

exports.inputAuthorData = inputAuthorData;
