const js = require("@eslint/js");

module.exports = [
  { ignores: [".vscode-test/*", "eslint.config.js"] },
  {
    files: ["**/*.js"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "commonjs",
      },
    },
    ...js.configs.recommended,
    rules: {
      "no-this-before-super": "warn",
      "no-undef": "warn",
      "constructor-super": "warn",
    },
  },
];
