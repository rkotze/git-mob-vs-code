const { spawnSync, exec } = require("child_process");
const { promisify } = require("util");
const { logIssue } = require("../errors/log-issue");
const { compare } = require("../semver/compare");
const { GitExt } = require("../vscode-git-extension/git-ext");

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
  try {
    return spawnSync(command, cmdOptions());
  } catch (err) {
    logIssue(`GitMob silentRun: "${command}" ${err.message}`);
    throw err;
  }
}

/**
 * Runs the given command in a shell.
 * @param {string} command The command to execute
 * @returns {Promise}
 */
async function silentExec(command) {
  const execAsync = promisify(exec);
  try {
    const response = await execAsync(command, cmdOptions());

    return response.stdout;
  } catch (err) {
    logIssue(`GitMob silentExec: "${command}" ${err.message}`);
    return "";
  }
}

function handleResponse(query) {
  const response = silentRun(query);
  if (response.status !== 0) {
    logIssue(`GitMob handleResponse: "${query}" ${response.stderr.trim()}`);
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

function gitMobLatest() {
  const version = silentRun("npx --package=git-mob git mob -v");
  if (version.status !== 0) return 1;
  return compare("1.1.0", version.stdout);
}

function installGitMob(local) {
  const flag = local ? "-D" : "-g";
  return silentExec(`npm i git-mob ${flag}`);
}

async function getRepoAuthors() {
  return silentExec(`git shortlog -sen HEAD`);
}

function addRepoAuthor({ commandKey, name, email }) {
  if (process.platform === "win32") {
    return silentRun(
      `npx --package=git-mob git add-coauthor ${commandKey} \\"${name}\\" ${email}`
    );
  }
  return silentRun(`npx --package=git-mob git add-coauthor ${commandKey} "${name}" ${email}`);
}

function setCurrent(mobList) {
  return format(handleResponse(`npx --package=git-mob git mob ${mobList.join(" ")}`));
}

function changeAuthor(authorKey) {
  return format(handleResponse(`npx --package=git-mob git mob -o ${authorKey}`));
}

function solo() {
  return format(handleResponse(`npx --package=git-mob git solo`));
}

function current() {
  return format(handleResponse(`npx --package=git-mob git mob`));
}

function listAll() {
  return format(handleResponse(`npx --package=git-mob git mob --list`));
}

function format(stdout) {
  return stdout.replace(/\r|<|>/g, "");
}

function cmdOptions() {
  const gitExt = new GitExt();
  return {
    encoding: "utf8",
    shell: true,
    cwd: gitExt.rootPath,
  };
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
    has,
  },
  mob: {
    current,
    setCurrent,
    listAll,
    solo,
    gitMobLatest,
    installGitMob,
    changeAuthor,
  },
  getRepoAuthors,
  addRepoAuthor,
};
