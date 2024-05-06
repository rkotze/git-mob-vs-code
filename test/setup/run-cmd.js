const { spawnSync } = require("child_process");
const path = require("path");

function runCmd(command) {
  console.log("runCmd: ", command);
  let spawn = spawnSync(command, {
    shell: true,
    encoding: "utf8",
    cwd: path.resolve(__dirname, "../fixture-1"),
  });
  return spawn;
}

exports.runCmd = runCmd;
