const { runCmd } = require("./run-cmd");

exports.afterAll = async function () {
  runCmd("rm -rf .git");
  console.log("** After all finished.");
};
