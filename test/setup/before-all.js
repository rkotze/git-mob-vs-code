const path = require("path");
const myExtension = require("../../extension");
const { runCmd } = require("./run-cmd");

exports.beforeAll = async function () {
  process.env.GITMOB_COAUTHORS_PATH = path.resolve(
    __dirname,
    "../git.co-authors"
  );
  runCmd("git init");
  await myExtension.ready();
};
