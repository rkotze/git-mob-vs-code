const { runCmd } = require("./run-cmd");

exports.afterAll = async function () {
  console.log("AFTER ALL RAN");
  runCmd("rm -rf .git");
};
