const { runCmd } = require("./run-cmd");

exports.afterAll = async function () {
  const { GITMOB_MESSAGE_PATH, GITMOB_COAUTHORS_PATH } = process.env;
  runCmd("rm -rf .git");
  runCmd(`rm ${GITMOB_COAUTHORS_PATH}`);
  runCmd(`rm ${GITMOB_MESSAGE_PATH}`);
  console.log("** After all finished.");
};
