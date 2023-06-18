const path = require("path");
const Mocha = require("mocha");
const { glob } = require("glob");
const { beforeAll } = require("./before-all");
const { afterAll } = require("./after-all");

exports.run = function run() {
  const testsRoot = path.resolve(__dirname, "../");
  const mocha = new Mocha({
    ui: "bdd",
    color: true,
    rootHooks: {
      beforeAll: beforeAll,
      afterAll: afterAll,
    },
    // timeout: 5000,
  });

  return new Promise(async (c, e) => {
    try {
      const files = await glob("**/**.test.js", { cwd: testsRoot });
      // Add files to the test suite
      files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));
      // Run the mocha test
      mocha.run((failures) => {
        if (failures > 0) {
          e(new Error(`${failures} tests failed.`));
        } else {
          c();
        }
      });
    } catch (err) {
      e(err);
    }
  });
};
