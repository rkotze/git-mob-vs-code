const path = require("path");
const Mocha = require("mocha");
const glob = require("glob");
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
  });

  return new Promise((c, e) => {
    glob("**/**.test.js", { cwd: testsRoot }, (err, files) => {
      if (err) {
        return e(err);
      }

      // Add files to the test suite
      files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

      try {
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
  });
};
