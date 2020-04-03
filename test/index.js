//
// PLEASE DO NOT MODIFY / DELETE UNLESS YOU KNOW WHAT YOU ARE DOING
//
// This file is providing the test runner to use when running extension tests.
// By default the test runner in use is Mocha based.
//
// You can provide your own test runner if you want to override it by exporting
// a function run(testRoot: string, clb: (error:Error) => void) that the extension
// host can call to run the tests. The test runner is expected to use console.log
// to report the results back to the caller. When the tests are finished, return
// a possible error to the callback or null if none.
const path = require("path");
const jest = require("jest");
function run(testRoot, reportTestResults) {
  jest
    .runCLI({ testMatch: ["<rootDir>/test/**/*.e2e.js"] }, [
      path.resolve(__dirname)
    ])
    .then(jestCliCallResult => {
      jestCliCallResult.results.testResults.forEach(testResult => {
        testResult.testResults
          .filter(assertionResult => assertionResult.status === "passed")
          .forEach(({ ancestorTitles, title, status }) => {
            console.info(`  ● ${ancestorTitles} › ${title} (${status})`);
          });
      });

      jestCliCallResult.results.testResults.forEach(testResult => {
        if (testResult.failureMessage) {
          console.error(testResult.failureMessage);
        }
      });

      reportTestResults(undefined, jestCliCallResult.results.numFailedTests);
    })
    .catch(errorCaughtByJestRunner => {
      reportTestResults(errorCaughtByJestRunner, 0);
    });
}

module.exports = { run };
