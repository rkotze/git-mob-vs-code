const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  { ignores: [".vscode-test/*"] },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.mocha,
      },
    },
    ...js.configs.recommended,
  },
];
