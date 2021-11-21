const myExtension = require("../../extension");
const { runCmd } = require("./run-cmd");

exports.beforeAll = async function () {
  console.log("BEFORE ALL RAN");
  runCmd("git init");
  await myExtension.ready();
};
