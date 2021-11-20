const path = require("path");

const { runTests } = require("@vscode/test-electron");

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, "../");

    // The path to the extension test runner script
    // Passed to --extensionTestsPath
    // const extensionTestsPath = path.resolve(__dirname, "./index");
    const extensionTestsPath = path.resolve(__dirname, "./mocha-suite.js");
    const testWorkspace = path.resolve(__dirname, "../../advent2020");
    // Download VS Code, unzip it and run the integration test
    await runTests({
      version: "insiders",
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: [testWorkspace, "--disable-extensions"],
    });
  } catch (err) {
    console.error(err);
    console.error("Failed to run tests");
    process.exit(1);
  }
}

main();
