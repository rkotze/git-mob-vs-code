const vscode = require("vscode");
const { spawnSync } = require("child_process");

/**
 * @typedef {Object} ChildProcess.SpawnResult
 * @property {number} pid Process identification number of the child process
 * @property {Array} output Array of results from stdio output
 * @property {Buffer} stdout  The contents of output[1]
 * @property {Buffer} stderr The contents of output[2]
 * @property {number} status The exit code of the child process
 * @property {string} signal The signal used to kill the child process
 * @property {Error} error The error object if the child process failed or timed out
 */

/**
 * Runs the given command in a shell.
 * @param {string} command The command to execute
 * @returns {ChildProcess.SpawnResult} object from child_process.spawnSync
 */
function silentRun(command) {
  return spawnSync(command, {
    encoding: "utf8",
    shell: true,
    cwd: vscode.workspace.rootPath
  });
}

function handleResponse(query) {
  const response = silentRun(query);
  if (response.status !== 0) {
    vscode.window.showErrorMessage("GitMob error: " + response.stderr.trim());
    return "";
  }

  return response.stdout.trim();
}

function get(key) {
  return handleResponse(`git config --get ${key}`);
}

function has(key) {
  return silentRun(`git config ${key}`).status === 0;
}

function setCurrent(mobList) {
  let processMob;
  if (mobList.length > 0)
    processMob = handleResponse(`git mob ${mobList.join(" ")}`);
  else processMob = handleResponse(`git solo`);

  return format(processMob);
}

function current() {
  return format(handleResponse(`git mob`));
}

function listAll() {
  return format(handleResponse(`git mob --list`));
}

function format(stdout) {
  return stdout.replace(/\r|<|>/g, "");
}

/**
 * Extracts the git version into an array format.
 * @param {string} version a string containing a semver format
 * @returns {array} [major, minor, patch]
 */
function gitVersion(version) {
  const [, major, minor, patch] = /(\d)\.(\d*)\.(\d*)/gm.exec(version);
  return [major, minor, patch];
}

module.exports = {
  version: gitVersion,
  config: {
    get,
    has
  },
  mob: {
    current,
    setCurrent,
    listAll
  }
};
