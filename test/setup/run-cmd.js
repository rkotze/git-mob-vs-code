const { spawnSync } = require("child_process");
const path = require("path");

function runCmd(command) {
  return spawnSync(command, {
    shell: true,
    encoding: "utf8",
    cwd: path.resolve(__dirname, "../fixture-1"),
  });
}
exports.runCmd = runCmd;
