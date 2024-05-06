const path = require("path");
const myExtension = require("../../extension");
const { installTestCoAuthorFile } = require("./install-test-co-author-file");
const { runCmd } = require("./run-cmd");

exports.beforeAll = async function () {
  process.env.GITMOB_COAUTHORS_PATH = path.resolve(
    __dirname,
    "../git.co-authors"
  );
  process.env.GITMOB_MESSAGE_PATH = path.resolve(__dirname, "../.gitmessage");

  runCmd("git init");
  runCmd("git config --local user.name Richard");
  runCmd("git config --local user.email rich.kotze@gitmob.com");

  await installTestCoAuthorFile();
  const ready = await myExtension.ready();
  console.log("** Before all finished: ", ready);
};
